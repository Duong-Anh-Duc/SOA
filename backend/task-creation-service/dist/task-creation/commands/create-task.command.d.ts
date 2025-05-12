export declare class CreateTaskCommand {
    readonly title: string;
    readonly description: string;
    readonly deadline: string;
    readonly assigneeIds: number[];
    readonly teamId: number;
    readonly createdById: number;
    readonly status: string;
    readonly priority: string;
    readonly startDate: string;
    constructor(title: string, description: string, deadline: string, assigneeIds: number[], teamId: number, createdById: number, status: string, priority: string, startDate: string);
}
