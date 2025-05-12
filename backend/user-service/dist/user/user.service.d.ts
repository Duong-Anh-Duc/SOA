import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './entities/user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(id: number): Promise<User | null>;
    findByIds(ids: number[]): Promise<User[]>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        userId: number;
        token: any;
    }>;
    validateUser(token: string): Promise<{
        isValid: boolean;
        user: User;
        message?: undefined;
    } | {
        isValid: boolean;
        message: string;
        user?: undefined;
    }>;
}
