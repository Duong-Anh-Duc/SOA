export declare enum TaskStatus {
    TODO = "To Do",
    IN_PROGRESS = "In Progress",
    DONE = "Done"
}
export declare enum TaskPriority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High"
}
export declare class Task {
    id: number;
    title: string;
    description: string;
    deadline: Date;
    status: TaskStatus;
    priority: TaskPriority;
    startDate: Date;
    createdAt: Date;
    updatedAt: Date;
    createdById: number;
    assigneeIds: number[];
    teamId: number;
    attachments: string[];
}
