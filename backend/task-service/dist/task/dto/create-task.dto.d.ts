import { TaskPriority, TaskStatus } from "../entities/task.entity";
export declare class CreateTaskDto {
    title: string;
    description: string;
    deadline: Date;
    status?: TaskStatus;
    priority?: TaskPriority;
    startDate?: Date;
    createdById: number;
    assigneeIds: number[];
    teamId: number;
    attachments?: string[];
}
