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
exports.CreateTaskHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const task_created_event_1 = require("../../events/task-created.event");
const task_creation_service_1 = require("../../task-creation.service");
const create_task_command_1 = require("../create-task.command");
let CreateTaskHandler = class CreateTaskHandler {
    taskCreationService;
    eventBus;
    constructor(taskCreationService, eventBus) {
        this.taskCreationService = taskCreationService;
        this.eventBus = eventBus;
    }
    async execute(command) {
        const { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate } = command;
        const result = await this.taskCreationService.createAndAssign({
            title,
            description,
            deadline,
            assigneeIds,
            teamId,
            createdById,
            status,
            priority,
            startDate,
        });
        const task = result.task;
        this.eventBus.publish(new task_created_event_1.TaskCreatedEvent(task.id, title, description, deadline, teamId, assigneeIds));
        return result;
    }
};
exports.CreateTaskHandler = CreateTaskHandler;
exports.CreateTaskHandler = CreateTaskHandler = __decorate([
    (0, cqrs_1.CommandHandler)(create_task_command_1.CreateTaskCommand),
    __metadata("design:paramtypes", [task_creation_service_1.TaskCreationService,
        cqrs_1.EventBus])
], CreateTaskHandler);
//# sourceMappingURL=create-task.handler.js.map