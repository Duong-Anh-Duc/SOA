import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { GatewayService } from './gateway.service';

@Controller('api')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('task-creation/create-and-assign')
  createAndAssignTask(@Body() createTaskDto: any) {
    return this.gatewayService.forwardRequest('task-creation', 'create-and-assign', createTaskDto, 'POST');
  }

  @Get('tasks')
  getAllTasks(@Query('teamId') teamId: string, @Query('userId') userId?: string) {
    return this.gatewayService.forwardRequest('tasks', '', { teamId, userId }, 'GET');
  }

  @Get('tasks/:id')
  getTask(@Param('id') id: string) {
    return this.gatewayService.forwardRequest('tasks', id, {}, 'GET');
  }

  @Get('teams/:id')
  getTeam(@Param('id') id: string) {
    return this.gatewayService.forwardRequest('teams', id, {}, 'GET');
  }

  @Get('teams/:id/members')
  getTeamMembers(@Param('id') id: string) {
    return this.gatewayService.forwardRequest('teams', `${id}/members`, {}, 'GET');
  }

  @Get('teams/by-member/:userId')
  getTeamsByMember(@Param('userId') userId: string) {
    return this.gatewayService.forwardRequest('teams', `by-member/${userId}`, {}, 'GET');
  }

  @Post('teams/create')
  createTeam(@Body() createTeamDto: any) {
    return this.gatewayService.forwardRequest('teams', 'create', createTeamDto, 'POST');
  }

  @Get('users/:id')
  getUser(@Param('id') id: string) {
    return this.gatewayService.forwardRequest('users', id, {}, 'GET');
  }

  @Get('users/by-ids/:ids')
  getUsersByIds(@Param('ids') ids: string) {
    return this.gatewayService.forwardRequest('users', `by-ids/${ids}`, {}, 'GET');
  }

  @Post('users/create')
  createUser(@Body() createUserDto: any) {
    return this.gatewayService.forwardRequest('users', 'create', createUserDto, 'POST');
  }

  @Post('users/login')
  login(@Body() loginDto: any) {
    return this.gatewayService.forwardRequest('users', 'login', loginDto, 'POST');
  }

  @Get('validate/admin')
  validateAdmin(@Query('userId') userId: string, @Query('teamId') teamId: string) {
    return this.gatewayService.forwardRequest('validate', 'admin', { userId, teamId }, 'GET');
  }

  @Post('validate/user')
  validateUser(@Body() body: { token: string }) {
    return this.gatewayService.forwardRequest('validate', 'user', body, 'POST');
  }

  @Post('notifications/send')
  sendNotification(@Body() notificationDto: any) {
    return this.gatewayService.forwardRequest('notifications', 'send', notificationDto, 'POST');
  }
}