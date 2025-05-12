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
exports.GatewayController = void 0;
const common_1 = require("@nestjs/common");
const gateway_service_1 = require("./gateway.service");
let GatewayController = class GatewayController {
    gatewayService;
    constructor(gatewayService) {
        this.gatewayService = gatewayService;
    }
    createAndAssignTask(createTaskDto) {
        return this.gatewayService.forwardRequest('task-creation', 'create-and-assign', createTaskDto, 'POST');
    }
    getAllTasks(teamId, userId) {
        return this.gatewayService.forwardRequest('tasks', '', { teamId, userId }, 'GET');
    }
    getTask(id) {
        return this.gatewayService.forwardRequest('tasks', id, {}, 'GET');
    }
    getTeam(id) {
        return this.gatewayService.forwardRequest('teams', id, {}, 'GET');
    }
    getTeamMembers(id) {
        return this.gatewayService.forwardRequest('teams', `${id}/members`, {}, 'GET');
    }
    getTeamsByMember(userId) {
        return this.gatewayService.forwardRequest('teams', `by-member/${userId}`, {}, 'GET');
    }
    createTeam(createTeamDto) {
        return this.gatewayService.forwardRequest('teams', 'create', createTeamDto, 'POST');
    }
    getUser(id) {
        return this.gatewayService.forwardRequest('users', id, {}, 'GET');
    }
    getUsersByIds(ids) {
        return this.gatewayService.forwardRequest('users', `by-ids/${ids}`, {}, 'GET');
    }
    createUser(createUserDto) {
        return this.gatewayService.forwardRequest('users', 'create', createUserDto, 'POST');
    }
    login(loginDto) {
        return this.gatewayService.forwardRequest('users', 'login', loginDto, 'POST');
    }
    validateAdmin(userId, teamId) {
        return this.gatewayService.forwardRequest('validate', 'admin', { userId, teamId }, 'GET');
    }
    validateUser(body) {
        return this.gatewayService.forwardRequest('validate', 'user', body, 'POST');
    }
    sendNotification(notificationDto) {
        return this.gatewayService.forwardRequest('notifications', 'send', notificationDto, 'POST');
    }
};
exports.GatewayController = GatewayController;
__decorate([
    (0, common_1.Post)('task-creation/create-and-assign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "createAndAssignTask", null);
__decorate([
    (0, common_1.Get)('tasks'),
    __param(0, (0, common_1.Query)('teamId')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getAllTasks", null);
__decorate([
    (0, common_1.Get)('tasks/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getTask", null);
__decorate([
    (0, common_1.Get)('teams/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getTeam", null);
__decorate([
    (0, common_1.Get)('teams/:id/members'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getTeamMembers", null);
__decorate([
    (0, common_1.Get)('teams/by-member/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getTeamsByMember", null);
__decorate([
    (0, common_1.Post)('teams/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "createTeam", null);
__decorate([
    (0, common_1.Get)('users/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('users/by-ids/:ids'),
    __param(0, (0, common_1.Param)('ids')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "getUsersByIds", null);
__decorate([
    (0, common_1.Post)('users/create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('users/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('validate/admin'),
    __param(0, (0, common_1.Query)('userId')),
    __param(1, (0, common_1.Query)('teamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "validateAdmin", null);
__decorate([
    (0, common_1.Post)('validate/user'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "validateUser", null);
__decorate([
    (0, common_1.Post)('notifications/send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GatewayController.prototype, "sendNotification", null);
exports.GatewayController = GatewayController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [gateway_service_1.GatewayService])
], GatewayController);
//# sourceMappingURL=gateway.controller.js.map