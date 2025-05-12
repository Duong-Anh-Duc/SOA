export class TaskCreatedEvent {
    constructor(
      public readonly taskId: number,
      public readonly title: string,
      public readonly description: string,
      public readonly deadline: string,
      public readonly teamId: number,
      public readonly assigneeIds: number[],
    ) {}
  }