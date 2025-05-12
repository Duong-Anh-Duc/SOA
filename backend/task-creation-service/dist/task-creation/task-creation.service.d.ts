import { ClientProxy } from '@nestjs/microservices';
import { EventStoreService } from '../event-store/event-store.service';
import { TaskResponse } from './interfaces/task-response.interface';
export declare class TaskCreationService {
    private readonly eventStoreService;
    private readonly taskClient;
    private readonly notificationClient;
    constructor(eventStoreService: EventStoreService, taskClient: ClientProxy, notificationClient: ClientProxy);
    private testHandler;
    createAndAssign(createTaskDto: any): Promise<{
        message: string;
        task: TaskResponse;
    }>;
    testCreateTask(): Promise<{
        success: boolean;
        response?: TaskResponse;
        error?: string;
    }>;
    testTaskCreated(): Promise<{
        success: boolean;
        message?: string;
        error?: string;
    }>;
}
