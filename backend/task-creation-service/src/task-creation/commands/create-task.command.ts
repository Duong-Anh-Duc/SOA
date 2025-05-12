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