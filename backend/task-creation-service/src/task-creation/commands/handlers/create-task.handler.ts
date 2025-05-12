import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { TaskCreatedEvent } from '../../events/task-created.event';
import { TaskResponse } from '../../interfaces/task-response.interface';
import { TaskCreationService } from '../../task-creation.service';
import { CreateTaskCommand } from '../create-task.command';

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    private readonly taskCreationService: TaskCreationService,
    private readonly eventBus: EventBus,
  ) {}

  async execute(command: CreateTaskCommand) {
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

    const task: TaskResponse = result.task; 
    this.eventBus.publish(new TaskCreatedEvent(task.id, title, description, deadline, teamId, assigneeIds));
    return result;
  }
}