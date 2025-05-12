"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let ValidationService = class ValidationService {
    async validateUser(token) {
        if (!token) {
            return { isValid: false, message: 'Token là bắt buộc' };
        }
        try {
            const response = await axios_1.default.post(`http://localhost:3001/users/validate`, { token });
            return response.data;
        }
        catch (error) {
            return { isValid: false, message: 'Không thể xác thực người dùng' };
        }
    }
    async validateAdmin(userId, teamId) {
        const response = await axios_1.default.get(`http://localhost:3003/teams/${teamId}`);
        const team = response.data;
        if (!team) {
            return { isValid: false, message: 'Nhóm không tồn tại' };
        }
        return { isValid: team.adminId === userId };
    }
};
exports.ValidationService = ValidationService;
exports.ValidationService = ValidationService = __decorate([
    (0, common_1.Injectable)()
], ValidationService);
//# sourceMappingURL=validation.service.js.map