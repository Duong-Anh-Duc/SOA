import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectModel(Team.name)
    private teamModel: Model<Team>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { adminId, memberIds, ...teamData } = createTeamDto;

    const adminResponse = await axios.get(`http://localhost:3001/users/${adminId}`);
    const admin = adminResponse.data;
    if (!admin) {
      throw new Error('Không tìm thấy quản trị viên');
    }

    const membersResponse = await axios.get(`http://localhost:3001/users/by-ids/${memberIds.join(',')}`);
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

  async findOne(id: number) {
    const team = await this.teamModel.findOne({ id }).exec();
    if (!team) {
      throw new Error('Không tìm thấy nhóm');
    }

    const adminResponse = await axios.get(`http://localhost:3001/users/${team.adminId}`);
    const membersResponse = await axios.get(`http://localhost:3001/users/by-ids/${team.memberIds.join(',')}`);

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

  async getMembers(teamId: number) {
    const team = await this.teamModel.findOne({ id: teamId }).exec();
    if (!team) {
      throw new Error('Không tìm thấy nhóm');
    }

    const membersResponse = await axios.get(`http://localhost:3001/users/by-ids/${team.memberIds.join(',')}`);
    return membersResponse.data;
  }

  async getTeamsByMember(userId: number) {
    const teams = await this.teamModel.find({ memberIds: userId }).exec();
    const teamDetails = await Promise.all(
      teams.map(async (team) => {
        const adminResponse = await axios.get(`http://localhost:3001/users/${team.adminId}`);
        const membersResponse = await axios.get(`http://localhost:3001/users/by-ids/${team.memberIds.join(',')}`);
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
      })
    );
    return teamDetails;
  }
}