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
exports.TaskCreationController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const create_task_command_1 = require("./commands/create-task.command");
const task_creation_service_1 = require("./task-creation.service");
let TaskCreationController = class TaskCreationController {
    commandBus;
    taskCreationService;
    constructor(commandBus, taskCreationService) {
        this.commandBus = commandBus;
        this.taskCreationService = taskCreationService;
    }
    async createAndAssign(body) {
        const { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate } = body;
        const command = new create_task_command_1.CreateTaskCommand(title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate);
        return this.commandBus.execute(command);
    }
    async testCreateTask() {
        return this.taskCreationService.testCreateTask();
    }
    async testTaskCreated() {
        return this.taskCreationService.testTaskCreated();
    }
};
exports.TaskCreationController = TaskCreationController;
__decorate([
    (0, common_1.Post)('create-and-assign'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskCreationController.prototype, "createAndAssign", null);
__decorate([
    (0, common_1.Post)('test-create-task'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskCreationController.prototype, "testCreateTask", null);
__decorate([
    (0, common_1.Post)('test-task-created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskCreationController.prototype, "testTaskCreated", null);
exports.TaskCreationController = TaskCreationController = __decorate([
    (0, common_1.Controller)('task-creation'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus,
        task_creation_service_1.TaskCreationService])
], TaskCreationController);
//# sourceMappingURL=task-creation.controller.js.map