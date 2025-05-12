import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@Query('teamId') teamId: string, @Query('userId') userId?: string) {
    if (userId) {
      return this.taskService.findByTeamAndUser(+teamId, +userId);
    }
    return this.taskService.findByTeam(+teamId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }
}