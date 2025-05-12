export declare class TaskCreatedEvent {
    readonly taskId: number;
    readonly title: string;
    readonly description: string;
    readonly deadline: string;
    readonly teamId: number;
    readonly assigneeIds: number[];
    constructor(taskId: number, title: string, description: string, deadline: string, teamId: number, assigneeIds: number[]);
}
