"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("axios");
const mongoose_2 = require("mongoose");
const team_entity_1 = require("./entities/team.entity");
let TeamService = class TeamService {
    teamModel;
    constructor(teamModel) {
        this.teamModel = teamModel;
    }
    async create(createTeamDto) {
        const { adminId, memberIds, ...teamData } = createTeamDto;
        const adminResponse = await axios_1.default.get(`http://localhost:3001/users/${adminId}`);
        const admin = adminResponse.data;
        if (!admin) {
            throw new Error('Không tìm thấy quản trị viên');
        }
        const membersResponse = await axios_1.default.get(`http://localhost:3001/users/by-ids/${memberIds.join(',')}`);
        const members = membersResponse.data;
        if (members.length !== memberIds.length) {
            throw new Error('Không tìm thấy một số thành viên');
        }
        const lastTeam = await this.teamModel.findOne().sort({ id: -1 }).exec();
        const newId = lastTeam ? lastTeam.id + 1 : 1;
        const team = new this.teamModel({
            id: newId,
            ...teamData,
            adminId,
            memberIds,
        });
        return team.save();
    }
    async findOne(id) {
        const team = await this.teamModel.findOne({ id }).exec();
        if (!team) {
            throw new Error('Không tìm thấy nhóm');
        }
        const adminResponse = await axios_1.default.get(`http://localhost:3001/users/${team.adminId}`);
        const membersResponse = await axios_1.default.get(`http://localhost:3001/users/by-ids/${team.memberIds.join(',')}`);
        return {
            id: team.id,
            name: team.name,
            adminId: team.adminId,
            admin: adminResponse.data,
            memberIds: team.memberIds,
            members: membersResponse.data,
            taskIds: team.taskIds,
            createdAt: team.createdAt,
            updatedAt: team.updatedAt,
        };
    }
    async getMembers(teamId) {
        const team = await this.teamModel.findOne({ id: teamId }).exec();
        if (!team) {
            throw new Error('Không tìm thấy nhóm');
        }
        const membersResponse = await axios_1.default.get(`http://localhost:3001/users/by-ids/${team.memberIds.join(',')}`);
        return membersResponse.data;
    }
    async getTeamsByMember(userId) {
        const teams = await this.teamModel.find({ memberIds: userId }).exec();
        const teamDetails = await Promise.all(teams.map(async (team) => {
            const adminResponse = await axios_1.default.get(`http://localhost:3001/users/${team.adminId}`);
            const membersResponse = await axios_1.default.get(`http://localhost:3001/users/by-ids/${team.memberIds.join(',')}`);
            return {
                id: team.id,
                name: team.name,
                adminId: team.adminId,
                admin: adminResponse.data,
                memberIds: team.memberIds,
                members: membersResponse.data,
                taskIds: team.taskIds,
                createdAt: team.createdAt,
                updatedAt: team.updatedAt,
            };
        }));
        return teamDetails;
    }
};
exports.TeamService = TeamService;
exports.TeamService = TeamService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(team_entity_1.Team.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TeamService);
//# sourceMappingURL=team.service.js.map