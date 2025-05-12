"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTaskCommand = void 0;
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
//# sourceMappingURL=create-task.command.js.map