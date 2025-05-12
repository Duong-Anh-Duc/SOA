import { IQueryHandler } from '@nestjs/cqrs';
import { TaskService } from '../../task.service';
export declare class GetTasksQuery {
    readonly teamId: number;
    readonly userId?: number | undefined;
    constructor(teamId: number, userId?: number | undefined);
}
export declare class GetTasksHandler implements IQueryHandler<GetTasksQuery> {
    private readonly taskService;
    constructor(taskService: TaskService);
    execute(query: GetTasksQuery): Promise<{
        createdBy: any;
        assignees: any;
        team: any;
        id: number;
        title: string;
        description: string;
        deadline: Date;
        status: import("../../entities/task.entity").TaskStatus;
        priority: import("../../entities/task.entity").TaskPriority;
        startDate: Date;
        createdAt: Date;
        updatedAt: Date;
        createdById: number;
        assigneeIds: number[];
        teamId: number;
        attachments: string[];
    }[]>;
}
