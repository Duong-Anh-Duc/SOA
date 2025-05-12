"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const { password, ...userData } = createUserDto;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.userRepository.create({
            ...userData,
            password: hashedPassword,
        });
        return this.userRepository.save(user);
    }
    async findOne(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findByIds(ids) {
        return this.userRepository.findByIds(ids);
    }
    async login(loginDto) {
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
        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '10h' });
        return { message: "Đăng nhập thành công", userId: user.id, token };
    }
    async validateUser(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
            const user = await this.userRepository.findOne({ where: { id: decoded.userId } });
            if (!user) {
                throw new Error('Người dùng không tồn tại');
            }
            return { isValid: true, user };
        }
        catch (error) {
            return { isValid: false, message: 'Token không hợp lệ' };
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map