import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    create(createTaskDto: CreateTaskDto): Promise<import("./entities/task.entity").Task>;
    findAll(teamId: string, userId?: string): Promise<{
        createdBy: any;
        assignees: any;
        team: any;
        id: number;
        title: string;
        description: string;
        deadline: Date;
        status: import("./entities/task.entity").TaskStatus;
        priority: import("./entities/task.entity").TaskPriority;
        startDate: Date;
        createdAt: Date;
        updatedAt: Date;
        createdById: number;
        assigneeIds: number[];
        teamId: number;
        attachments: string[];
    }[]>;
    findOne(id: string): Promise<{
        createdBy: any;
        assignees: any;
        team: any;
        id: number;
        title: string;
        description: string;
        deadline: Date;
        status: import("./entities/task.entity").TaskStatus;
        priority: import("./entities/task.entity").TaskPriority;
        startDate: Date;
        createdAt: Date;
        updatedAt: Date;
        createdById: number;
        assigneeIds: number[];
        teamId: number;
        attachments: string[];
    }>;
}
