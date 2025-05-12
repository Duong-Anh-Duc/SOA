import { EventBus, ICommandHandler } from '@nestjs/cqrs';
import { TaskResponse } from '../../interfaces/task-response.interface';
import { TaskCreationService } from '../../task-creation.service';
import { CreateTaskCommand } from '../create-task.command';
export declare class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
    private readonly taskCreationService;
    private readonly eventBus;
    constructor(taskCreationService: TaskCreationService, eventBus: EventBus);
    execute(command: CreateTaskCommand): Promise<{
        message: string;
        task: TaskResponse;
    }>;
}
