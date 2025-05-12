import { GatewayService } from './gateway.service';
export declare class GatewayController {
    private readonly gatewayService;
    constructor(gatewayService: GatewayService);
    createAndAssignTask(createTaskDto: any): Promise<any>;
    getAllTasks(teamId: string, userId?: string): Promise<any>;
    getTask(id: string): Promise<any>;
    getTeam(id: string): Promise<any>;
    getTeamMembers(id: string): Promise<any>;
    getTeamsByMember(userId: string): Promise<any>;
    createTeam(createTeamDto: any): Promise<any>;
    getUser(id: string): Promise<any>;
    getUsersByIds(ids: string): Promise<any>;
    createUser(createUserDto: any): Promise<any>;
    login(loginDto: any): Promise<any>;
    validateAdmin(userId: string, teamId: string): Promise<any>;
    validateUser(body: {
        token: string;
    }): Promise<any>;
    sendNotification(notificationDto: any): Promise<any>;
}
