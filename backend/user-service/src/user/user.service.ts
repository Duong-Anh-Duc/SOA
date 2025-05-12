import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...userData } = createUserDto;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findByIds(ids: number[]) {
    return this.userRepository.findByIds(ids);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    const tmp = await this.userRepository.find();
    console.log(tmp);
    if (!user) {
      console.log(`Không tìm thấy người dùng với email ${email}`);
      throw new Error('Thông tin đăng nhập không hợp lệ');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Mật khẩu không khớp với người dùng ${email}. Đầu vào: ${password}, Lưu trữ (đã mã hóa): ${user.password}`);
      throw new Error('Thông tin đăng nhập không hợp lệ');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '10h' }
    );

    return { message: "Đăng nhập thành công", userId: user.id, token };
  }

  async validateUser(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      const user = await this.userRepository.findOne({ where: { id: decoded.userId } });
      if (!user) {
        throw new Error('Người dùng không tồn tại');
      }
      return { isValid: true, user };
    } catch (error) {
      return { isValid: false, message: 'Token không hợp lệ' };
    }
  }
}