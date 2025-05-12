import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskService } from '../../task.service';
import { CreateTaskDto } from '../../dto/create-task.dto';
import { TaskStatus, TaskPriority } from '../../entities/task.entity';

export class CreateTaskCommand {
  constructor(
    public readonly title: string,
    public readonly description: string,
    public readonly deadline: string,
    public readonly assigneeIds: number[],
    public readonly teamId: number,
    public readonly createdById: number,
    public readonly status: string, 
    public readonly priority: string, 
    public readonly startDate: string,
  ) {}
}

@CommandHandler(CreateTaskCommand)
export class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(private readonly taskService: TaskService) {}

  async execute(command: CreateTaskCommand) {
    const { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate } = command;

    let taskStatus: TaskStatus;
    switch (status) {
      case 'To Do':
        taskStatus = TaskStatus.TODO;
        break;
      case 'In Progress':
        taskStatus = TaskStatus.IN_PROGRESS;
        break;
      case 'Done':
        taskStatus = TaskStatus.DONE;
        break;
      default:
        taskStatus = TaskStatus.TODO; 
    }

    let taskPriority: TaskPriority;
    switch (priority) {
      case 'Low':
        taskPriority = TaskPriority.LOW;
        break;
      case 'Medium':
        taskPriority = TaskPriority.MEDIUM;
        break;
      case 'High':
        taskPriority = TaskPriority.HIGH;
        break;
      default:
        taskPriority = TaskPriority.MEDIUM; 
    }

    const createTaskDto: CreateTaskDto = {
      title,
      description,
      deadline: new Date(deadline),
      assigneeIds,
      teamId,
      createdById,
      status: taskStatus, 
      priority: taskPriority, 
      startDate: new Date(startDate),
    };

    return this.taskService.create(createTaskDto);
  }
}