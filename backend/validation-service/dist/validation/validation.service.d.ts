export declare class ValidationService {
    validateUser(token: string): Promise<any>;
    validateAdmin(userId: number, teamId: number): Promise<{
        isValid: boolean;
        message: string;
    } | {
        isValid: boolean;
        message?: undefined;
    }>;
}
