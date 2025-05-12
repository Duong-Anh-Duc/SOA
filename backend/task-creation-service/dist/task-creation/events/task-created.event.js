"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCreatedEvent = void 0;
class TaskCreatedEvent {
    taskId;
    title;
    description;
    deadline;
    teamId;
    assigneeIds;
    constructor(taskId, title, description, deadline, teamId, assigneeIds) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.teamId = teamId;
        this.assigneeIds = assigneeIds;
    }
}
exports.TaskCreatedEvent = TaskCreatedEvent;
//# sourceMappingURL=task-created.event.js.map