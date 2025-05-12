import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    create(createTeamDto: CreateTeamDto): Promise<import("mongoose").Document<unknown, {}, import("./entities/team.entity").Team, {}> & import("./entities/team.entity").Team & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findOne(id: string): Promise<{
        id: any;
        name: string;
        adminId: number;
        admin: any;
        memberIds: number[];
        members: any;
        taskIds: number[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    getMembers(id: string): Promise<any>;
    getTeamsByMember(userId: string): Promise<{
        id: any;
        name: string;
        adminId: number;
        admin: any;
        memberIds: number[];
        members: any;
        taskIds: number[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
