export class UpdateUserDto {
    username?: string;
    email?: string;
    password?: string; // Thêm trường password
    fullName?: string;
    role?: string;
  }