import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from './commands/create-task.command';
import { TaskCreationService } from './task-creation.service';

@Controller('task-creation')
export class TaskCreationController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly taskCreationService: TaskCreationService,
  ) {}

  @Post('create-and-assign')
  async createAndAssign(@Body() body: any) {
    const { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate } = body;
    const command = new CreateTaskCommand(
      title,
      description,
      deadline,
      assigneeIds,
      teamId,
      createdById,
      status,
      priority,
      startDate,
    );
    return this.commandBus.execute(command);
  }

  // Route thử nghiệm để gửi tin nhắn create_task
  @Post('test-create-task')
  async testCreateTask() {
    return this.taskCreationService.testCreateTask();
  }

  // Route thử nghiệm để gửi event task_created
  @Post('test-task-created')
  async testTaskCreated() {
    return this.taskCreationService.testTaskCreated();
  }
}