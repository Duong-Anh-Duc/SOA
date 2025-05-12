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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const typeorm_1 = require("@nestjs/typeorm");
const axios_1 = require("axios");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
let TaskService = class TaskService {
    taskRepository;
    constructor(taskRepository) {
        this.taskRepository = taskRepository;
        console.log('TaskService initialized, registering handler for createtask');
    }
    async handleCreateTask(data) {
        console.log('Handler for createtask triggered');
        console.log('Received createtask message in task-service:', data);
        console.log("OK");
        const { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate } = data;
        let taskStatus;
        switch (status) {
            case 'Cần Làm':
                taskStatus = task_entity_1.TaskStatus.TODO;
                break;
            case 'Đang Thực Hiện':
                taskStatus = task_entity_1.TaskStatus.IN_PROGRESS;
                break;
            case 'Hoàn Thành':
                taskStatus = task_entity_1.TaskStatus.DONE;
                break;
            default:
                taskStatus = task_entity_1.TaskStatus.TODO;
        }
        let taskPriority;
        switch (priority) {
            case 'Thấp':
                taskPriority = task_entity_1.TaskPriority.LOW;
                break;
            case 'Trung Bình':
                taskPriority = task_entity_1.TaskPriority.MEDIUM;
                break;
            case 'Cao':
                taskPriority = task_entity_1.TaskPriority.HIGH;
                break;
            default:
                taskPriority = task_entity_1.TaskPriority.MEDIUM;
        }
        const createTaskDto = {
            title,
            description,
            deadline: new Date(deadline),
            assigneeIds,
            teamId,
            createdById,
            status: taskStatus,
            priority: taskPriority,
            startDate: new Date(startDate),
        };
        const task = await this.create(createTaskDto);
        return task;
    }
    async handleUndefinedPattern(data) {
        console.error('Received message with undefined or unmatched pattern in task-service:', data);
        return { success: false, message: 'No matching handler for this pattern' };
    }
    async handleTestHandler(data) {
        console.log('Handler for testhandler triggered');
        console.log('Received testhandler message in task-service:', data);
        return { success: true, message: 'Handler test successful' };
    }
    async create(createTaskDto) {
        const { createdById, assigneeIds, teamId, ...taskData } = createTaskDto;
        const createdByResponse = await axios_1.default.get(`http://localhost:3001/users/${createdById}`);
        const createdBy = createdByResponse.data;
        if (!createdBy) {
            throw new Error('Không tìm thấy người dùng');
        }
        const assigneesResponse = await axios_1.default.get(`http://localhost:3001/users/by-ids/${assigneeIds.join(',')}`);
        const assignees = assigneesResponse.data;
        if (assignees.length !== assigneeIds.length) {
            throw new Error('Không tìm thấy một số người nhận công việc');
        }
        const teamResponse = await axios_1.default.get(`http://localhost:3003/teams/${teamId}`);
        const team = teamResponse.data;
        if (!team) {
            throw new Error('Không tìm thấy nhóm');
        }
        const task = this.taskRepository.create({
            ...taskData,
            createdById,
            assigneeIds,
            teamId,
        });
        return this.taskRepository.save(task);
    }
    async findAll() {
        const tasks = await this.taskRepository.find();
        return Promise.all(tasks.map(task => this.enrichTask(task)));
    }
    async findByTeam(teamId) {
        const tasks = await this.taskRepository.find({ where: { teamId } });
        return Promise.all(tasks.map(task => this.enrichTask(task)));
    }
    async findByTeamAndUser(teamId, userId) {
        const tasks = await this.taskRepository.find({ where: { teamId } });
        const filteredTasks = tasks.filter(task => task.assigneeIds.includes(userId));
        return Promise.all(filteredTasks.map(task => this.enrichTask(task)));
    }
    async findOne(id) {
        const task = await this.taskRepository.findOne({ where: { id } });
        if (!task) {
            throw new Error('Không tìm thấy công việc');
        }
        return this.enrichTask(task);
    }
    async enrichTask(task) {
        const createdByResponse = await axios_1.default.get(`http://localhost:3001/users/${task.createdById}`);
        const assigneesResponse = await axios_1.default.get(`http://localhost:3001/users/by-ids/${task.assigneeIds.join(',')}`);
        const teamResponse = await axios_1.default.get(`http://localhost:3003/teams/${task.teamId}`);
        return {
            ...task,
            createdBy: createdByResponse.data,
            assignees: assigneesResponse.data,
            team: teamResponse.data,
        };
    }
};
exports.TaskService = TaskService;
__decorate([
    (0, microservices_1.MessagePattern)('createtask'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "handleCreateTask", null);
__decorate([
    (0, microservices_1.MessagePattern)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "handleUndefinedPattern", null);
__decorate([
    (0, microservices_1.MessagePattern)('testhandler'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TaskService.prototype, "handleTestHandler", null);
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TaskService);
//# sourceMappingURL=task.service.js.map