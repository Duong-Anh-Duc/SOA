export declare class NotificationService {
    private transporter;
    constructor();
    private sendEmail;
    sendNotification(recipients: number[], message: string): Promise<{
        success: boolean;
        message: string;
    }>;
    handleTaskCreated(payload: {
        taskId: number;
        title: string;
        assigneeIds: number[];
    }): Promise<void>;
}
