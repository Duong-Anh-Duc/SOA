import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    findOne(id: string): Promise<import("./entities/user.entity").User | null>;
    findByIds(ids: string): Promise<import("./entities/user.entity").User[]>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        userId: number;
        token: any;
    }>;
    validateUser(token: string): Promise<{
        isValid: boolean;
        user: import("./entities/user.entity").User;
        message?: undefined;
    } | {
        isValid: boolean;
        message: string;
        user?: undefined;
    }>;
}
