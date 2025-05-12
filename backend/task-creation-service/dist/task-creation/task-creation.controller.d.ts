import { CommandBus } from '@nestjs/cqrs';
import { TaskCreationService } from './task-creation.service';
export declare class TaskCreationController {
    private readonly commandBus;
    private readonly taskCreationService;
    constructor(commandBus: CommandBus, taskCreationService: TaskCreationService);
    createAndAssign(body: any): Promise<any>;
    testCreateTask(): Promise<{
        success: boolean;
        response?: import("./interfaces/task-response.interface").TaskResponse;
        error?: string;
    }>;
    testTaskCreated(): Promise<{
        success: boolean;
        message?: string;
        error?: string;
    }>;
}
