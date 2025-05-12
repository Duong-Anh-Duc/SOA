import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ValidationService {
  async validateUser(token: string) {
    if (!token) {
      return { isValid: false, message: 'Token là bắt buộc' }; // Thay đổi thông điệp
    }

    try {
      const response = await axios.post(`http://localhost:3001/users/validate`, { token });
      return response.data;
    } catch (error) {
      return { isValid: false, message: 'Không thể xác thực người dùng' }; // Thay đổi thông điệp
    }
  }

  async validateAdmin(userId: number, teamId: number) {
    const response = await axios.get(`http://localhost:3003/teams/${teamId}`);
    const team = response.data;
    if (!team) {
      return { isValid: false, message: 'Nhóm không tồn tại' }; // Thay đổi thông điệp
    }
    return { isValid: team.adminId === userId };
  }
}