import { ValidationService } from './validation.service';
export declare class ValidationController {
    private readonly validationService;
    constructor(validationService: ValidationService);
    validateUser(token: string): Promise<any>;
    validateAdmin(userId: string, teamId: string): Promise<{
        isValid: boolean;
        message: string;
    } | {
        isValid: boolean;
        message?: undefined;
    }>;
}
