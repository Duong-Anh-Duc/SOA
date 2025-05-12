export class UpdateTaskDto {
    title?: string;
    description?: string;
    deadline?: Date;
    status?: string;
    priority?: string;
    startDate?: Date;
    assigneeIds?: number[];
    teamId?: number;
    attachments?: string[];
  }