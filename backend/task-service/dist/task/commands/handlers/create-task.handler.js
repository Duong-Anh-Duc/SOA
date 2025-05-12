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
exports.CreateTaskHandler = exports.CreateTaskCommand = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const task_service_1 = require("../../task.service");
const task_entity_1 = require("../../entities/task.entity");
class CreateTaskCommand {
    title;
    description;
    deadline;
    assigneeIds;
    teamId;
    createdById;
    status;
    priority;
    startDate;
    constructor(title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.assigneeIds = assigneeIds;
        this.teamId = teamId;
        this.createdById = createdById;
        this.status = status;
        this.priority = priority;
        this.startDate = startDate;
    }
}
exports.CreateTaskCommand = CreateTaskCommand;
let CreateTaskHandler = class CreateTaskHandler {
    taskService;
    constructor(taskService) {
        this.taskService = taskService;
    }
    async execute(command) {
        const { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate } = command;
        let taskStatus;
        switch (status) {
            case 'To Do':
                taskStatus = task_entity_1.TaskStatus.TODO;
                break;
            case 'In Progress':
                taskStatus = task_entity_1.TaskStatus.IN_PROGRESS;
                break;
            case 'Done':
                taskStatus = task_entity_1.TaskStatus.DONE;
                break;
            default:
                taskStatus = task_entity_1.TaskStatus.TODO;
        }
        let taskPriority;
        switch (priority) {
            case 'Low':
                taskPriority = task_entity_1.TaskPriority.LOW;
                break;
            case 'Medium':
                taskPriority = task_entity_1.TaskPriority.MEDIUM;
                break;
            case 'High':
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
        return this.taskService.create(createTaskDto);
    }
};
exports.CreateTaskHandler = CreateTaskHandler;
exports.CreateTaskHandler = CreateTaskHandler = __decorate([
    (0, cqrs_1.CommandHandler)(CreateTaskCommand),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], CreateTaskHandler);
//# sourceMappingURL=create-task.handler.js.map