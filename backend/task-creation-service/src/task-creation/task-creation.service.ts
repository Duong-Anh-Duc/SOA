import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { EventStoreService } from '../event-store/event-store.service';
import { TaskResponse } from './interfaces/task-response.interface';

@Injectable()
export class TaskCreationService {
  constructor(
    private readonly eventStoreService: EventStoreService,
    @Inject('TASK_SERVICE') private readonly taskClient: ClientProxy,
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
  ) {
    console.log('TaskCreationService initialized');
    console.log('taskClient injected:', this.taskClient ? 'Yes' : 'No');
    console.log('notificationClient injected:', this.notificationClient ? 'Yes' : 'No');

    this.taskClient
      .connect()
      .then(() => {
        console.log('taskClient connected to Redis successfully');
        this.testHandler();
      })
      .catch((error) => {
        console.error('taskClient failed to connect to Redis:', error.message || error);
      });

    this.notificationClient
      .connect()
      .then(() => {
        console.log('notificationClient connected to Redis successfully');
      })
      .catch((error) => {
        console.error('notificationClient failed to connect to Redis:', error.message || error);
      });
  }

  private async testHandler() {
    try {
      const testData = { message: 'Test handler' };
      const response = await new Promise<any>((resolve, reject) => {
        console.log('Sending testhandler message to TASK_SERVICE...');
        this.taskClient
          .send('testhandler', testData)
          .subscribe({
            next: (res) => {
              console.log('Received response from TASK_SERVICE:', res);
              resolve(res);
            },
            error: (err) => {
              console.error('Failed to send testhandler message to TASK_SERVICE:', err.message || err);
              reject(err);
            },
          });
      });
      console.log('Test handler successful:', response);
    } catch (error) {
      console.error('Test handler failed:', error.message || error);
    }
  }

  async createAndAssign(createTaskDto: any): Promise<{ message: string; task: TaskResponse }> {
    console.log('createTaskDto:', createTaskDto);
    const { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate } = createTaskDto;

    console.log('Preparing to send createtask to task-service:', { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate });

    let taskResponse: TaskResponse;
    try {
      taskResponse = await new Promise<TaskResponse>((resolve, reject) => {
        console.log('Sending createtask to task-service with pattern:', 'createtask');
        this.taskClient
          .send('createtask', { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate })
          .subscribe({
            next: (response) => {
              console.log('Successfully received response from task-service:', response);
              resolve(response);
            },
            error: (err) => {
              console.error('Failed to send createtask to task-service:', err.message || err);
              reject(err);
            },
            complete: () => {
              console.log('Completed sending createtask to task-service');
            },
          });
      });
    } catch (error) {
      console.error('Error during createtask communication:', error.message || error);
      throw new Error(`Không thể gửi tin nhắn createtask đến task-service: ${error.message || error}`);
    }

    if (!taskResponse || !taskResponse.id) {
      console.error('Invalid taskResponse:', taskResponse);
      throw new Error('Không nhận được phản hồi hợp lệ từ task-service');
    }

    const taskId = taskResponse.id;

    try {
      console.log('Saving event to event store:', { taskId, title, description, deadline, teamId, assigneeIds });
      await this.eventStoreService.save({
        aggregateId: taskId,
        aggregateType: 'Task',
        eventType: 'TaskCreated',
        payload: { title, description, deadline, teamId, assigneeIds },
      });
      console.log('Event saved successfully');
    } catch (error) {
      console.error('Error saving event to event store:', error);
      throw error;
    }

    console.log('Sending taskcreated to notification-service:', { taskId, title, assigneeIds });
    this.notificationClient.emit('taskcreated', {
      taskId,
      title,
      assigneeIds,
    });

    return { message: "Tạo và giao công việc thành công", task: taskResponse };
  }

  async testCreateTask(): Promise<{ success: boolean; response?: TaskResponse; error?: string }> {
    const testData = {
      title: "Test Task",
      description: "Test Description",
      deadline: "2025-05-09T17:00:00.000Z",
      assigneeIds: [1, 2, 3],
      teamId: 1,
      createdById: 1,
      status: "Cần Làm",
      priority: "Cao",
      startDate: "2025-04-30T17:00:00.000Z",
    };

    console.log('Preparing to send test createtask to task-service:', testData);

    try {
      const response = await new Promise<TaskResponse>((resolve, reject) => {
        console.log('Sending test createtask to task-service...');
        this.taskClient
          .send('createtask', testData)
          .subscribe({
            next: (res) => {
              console.log('Successfully received test response from task-service:', res);
              resolve(res);
            },
            error: (err) => {
              console.error('Failed to send test createtask to task-service:', err);
              reject(err);
            },
          });
      });
      return { success: true, response };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  async testTaskCreated(): Promise<{ success: boolean; message?: string; error?: string }> {
    const testPayload = {
      taskId: 999,
      title: "Test Task",
      assigneeIds: [1, 2, 3],
    };

    console.log('Sending test taskcreated to notification-service:', testPayload);

    try {
      this.notificationClient.emit('taskcreated', testPayload);
      return { success: true, message: 'Test taskcreated event sent successfully' };
    } catch (error) {
      console.error('Failed to send test taskcreated to notification-service:', error);
      return { success: false, error: error.message };
    }
  }
}