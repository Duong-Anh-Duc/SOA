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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const axios_1 = require("axios");
const nodemailer = require("nodemailer");
let NotificationService = class NotificationService {
    transporter;
    constructor() {
        try {
            this.transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'ducytcg123456@gmail.com',
                    pass: 'tcsn rjsp ssbl yfxj',
                },
            });
            console.log('NotificationService initialized, registering handler for taskcreated');
        }
        catch (error) {
            console.error('Failed to initialize NotificationService:', error.message || error);
            throw error;
        }
    }
    async sendEmail(emails, message, subject) {
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
    async sendNotification(recipients, message) {
        try {
            const userIds = recipients.join(',');
            const response = await axios_1.default.get(`http://localhost:3001/users/by-ids/${userIds}`);
            const users = response.data;
            if (!users || users.length === 0) {
                throw new Error('Không tìm thấy người dùng với ID đã cung cấp');
            }
            const emails = users.map(user => user.email);
            await this.sendEmail(emails, message, 'Thông Báo Phân Công Công Việc');
            return { success: true, message: 'Đã gửi email thông báo thành công' };
        }
        catch (error) {
            console.error(`Không thể gửi email: ${error.message}`);
            throw new Error(`Không thể gửi email thông báo: ${error.message}`);
        }
    }
    async handleTaskCreated(payload) {
        console.log('Received taskcreated event in notification-service:', payload);
        try {
            const { taskId, title, assigneeIds } = payload;
            const userIds = assigneeIds.join(',');
            const response = await axios_1.default.get(`http://localhost:3001/users/by-ids/${userIds}`);
            const users = response.data;
            if (!users || users.length === 0) {
                throw new Error('Không tìm thấy người dùng với ID đã cung cấp');
            }
            const emails = users.map(user => user.email);
            await this.sendEmail(emails, `Công việc ${title} đã được tạo`, 'Thông Báo Phân Công Công Việc');
        }
        catch (error) {
            console.error('Không thể gửi thông báo:', error);
        }
    }
};
exports.NotificationService = NotificationService;
__decorate([
    (0, microservices_1.EventPattern)('taskcreated'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationService.prototype, "handleTaskCreated", null);
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], NotificationService);
//# sourceMappingURL=notification.service.js.map