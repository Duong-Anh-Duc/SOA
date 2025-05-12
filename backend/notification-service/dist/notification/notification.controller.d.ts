import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sendNotification(notificationDto: {
        recipients: number[];
        message: string;
    }): Promise<{
        success: boolean;
        message: string;
    }>;
}
