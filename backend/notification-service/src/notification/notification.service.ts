import { Injectable } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import axios from 'axios';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NotificationService {
  private transporter: nodemailer.Transporter;

  constructor() {
    try {
      this.transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'ducytcg123456@gmail.com',
          pass: 'tcsn rjsp ssbl yfxj', // Thay bằng App Password từ Gmail
        },
      });
      console.log('NotificationService initialized, registering handler for taskcreated');
    } catch (error) {
      console.error('Failed to initialize NotificationService:', error.message || error);
      throw error;
    }
  }

  private async sendEmail(emails: string[], message: string, subject: string) {
    const mailOptions = {
      from: 'ducytcg123456@gmail.com',
      to: emails.join(','),
      subject: "Thông Báo Phân Công Công Việc",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border-radius: 10px; background: linear-gradient(135deg, #f5f7fa, #c3cfe2); box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h2 style="color: #1a3c34; font-size: 24px; margin: 0;">
              Thông Báo Phân Công Công Việc
            </h2>
            <p style="color: #888; font-size: 16px; margin: 5px 0;">
              Bạn đã được giao một công việc mới!
            </p>
          </div>
          <div style="background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);">
            <h3 style="color: #6e8efb; font-size: 20px; margin: 0 0 10px;">
              Chi Tiết Công Việc
            </h3>
            <p style="color: #555; font-size: 16px; margin: 5px 0;">
              <strong>Công Việc:</strong> ${message.split(': ')[1] || message}
            </p>
            <p style="color: #555; font-size: 16px; margin: 5px 0;">
              <strong>Được Giao Cho:</strong> ${emails.join(', ')}
            </p>
            <p style="color: #555; font-size: 16px; margin: 5px 0;">
              <strong>Thời Gian:</strong> ${new Date().toLocaleString('vi-VN')}
            </p>
          </div>
          <div style="text-align: center; margin-top: 20px;">
            <a
              href="http://localhost:5173"
              style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #6e8efb, #a777e3); color: white; text-decoration: none; border-radius: 5px; font-weight: bold; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);"
            >
              Xem Công Việc
            </a>
          </div>
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 14px;">
            <p>© 2025 Phân Công Công Việc. Bản quyền thuộc về chúng tôi.</p>
          </div>
        </div>
      `,
    };

    await this.transporter.sendMail(mailOptions);
    console.log(`Email đã được gửi đến ${emails.join(', ')}: ${message}`);
  }

  async sendNotification(recipients: number[], message: string) {
    try {
      const userIds = recipients.join(',');
      const response = await axios.get(`http://localhost:3001/users/by-ids/${userIds}`);
      const users = response.data;

      if (!users || users.length === 0) {
        throw new Error('Không tìm thấy người dùng với ID đã cung cấp');
      }

      const emails = users.map(user => user.email);

      await this.sendEmail(emails, message, 'Thông Báo Phân Công Công Việc');
      return { success: true, message: 'Đã gửi email thông báo thành công' };
    } catch (error) {
      console.error(`Không thể gửi email: ${error.message}`);
      throw new Error(`Không thể gửi email thông báo: ${error.message}`);
    }
  }

  @EventPattern('taskcreated')
  async handleTaskCreated(payload: { taskId: number; title: string; assigneeIds: number[] }) {
    console.log('Received taskcreated event in notification-service:', payload);
    try {
      const { taskId, title, assigneeIds } = payload;
      const userIds = assigneeIds.join(',');
      const response = await axios.get(`http://localhost:3001/users/by-ids/${userIds}`);
      const users = response.data;

      if (!users || users.length === 0) {
        throw new Error('Không tìm thấy người dùng với ID đã cung cấp');
      }

      const emails = users.map(user => user.email);

      await this.sendEmail(emails, `Công việc ${title} đã được tạo`, 'Thông Báo Phân Công Công Việc');
    } catch (error) {
      console.error('Không thể gửi thông báo:', error);
    }
  }
}