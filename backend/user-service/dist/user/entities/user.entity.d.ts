export declare enum UserRole {
    ADMIN = "Admin",
    MEMBER = "Member"
}
export declare class User {
    id: number;
    username: string;
    email: string;
    password: string;
    fullName: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
