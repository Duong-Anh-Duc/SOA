import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('create')
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(+id);
  }

  @Get(':id/members')
  getMembers(@Param('id') id: string) {
    return this.teamService.getMembers(+id);
  }

  @Get('by-member/:userId')
  getTeamsByMember(@Param('userId') userId: string) {
    return this.teamService.getTeamsByMember(+userId);
  }
}