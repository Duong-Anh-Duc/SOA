import { Model } from 'mongoose';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
export declare class TeamService {
    private teamModel;
    constructor(teamModel: Model<Team>);
    create(createTeamDto: CreateTeamDto): Promise<import("mongoose").Document<unknown, {}, Team, {}> & Team & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findOne(id: number): Promise<{
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
    getMembers(teamId: number): Promise<any>;
    getTeamsByMember(userId: number): Promise<{
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
