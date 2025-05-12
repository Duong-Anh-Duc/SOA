import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskPriority, TaskStatus } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {
    console.log('TaskService initialized, registering handler for createtask');
  }

  @MessagePattern('createtask')
  async handleCreateTask(data: any) {
    console.log('Handler for createtask triggered');
    console.log('Received createtask message in task-service:', data);
    console.log("OK");

    const { title, description, deadline, assigneeIds, teamId, createdById, status, priority, startDate } = data;

    let taskStatus: TaskStatus;
    switch (status) {
      case 'Cần Làm':
        taskStatus = TaskStatus.TODO;
        break;
      case 'Đang Thực Hiện':
        taskStatus = TaskStatus.IN_PROGRESS;
        break;
      case 'Hoàn Thành':
        taskStatus = TaskStatus.DONE;
        break;
      default:
        taskStatus = TaskStatus.TODO;
    }

    let taskPriority: TaskPriority;
    switch (priority) {
      case 'Thấp':
        taskPriority = TaskPriority.LOW;
        break;
      case 'Trung Bình':
        taskPriority = TaskPriority.MEDIUM;
        break;
      case 'Cao':
        taskPriority = TaskPriority.HIGH;
        break;
      default:
        taskPriority = TaskPriority.MEDIUM;
    }

    const createTaskDto: CreateTaskDto = {
      title,
      description,
      deadline: new Date(deadline),
      assigneeIds,
      teamId,
      createdById,
      status: taskStatus,
      priority: taskPriority,
      startDate: new Date(startDate),
    };

    const task = await this.create(createTaskDto);
    return task;
  }

  @MessagePattern()
  async handleUndefinedPattern(data: any) {
    console.error('Received message with undefined or unmatched pattern in task-service:', data);
    return { success: false, message: 'No matching handler for this pattern' };
  }

  @MessagePattern('testhandler')
  async handleTestHandler(data: any) {
    console.log('Handler for testhandler triggered');
    console.log('Received testhandler message in task-service:', data);
    return { success: true, message: 'Handler test successful' };
  }
  
  async create(createTaskDto: CreateTaskDto) {
    const { createdById, assigneeIds, teamId, ...taskData } = createTaskDto;

    const createdByResponse = await axios.get(`http://localhost:3001/users/${createdById}`);
    const createdBy = createdByResponse.data;
    if (!createdBy) {
      throw new Error('Không tìm thấy người dùng');
    }

    const assigneesResponse = await axios.get(`http://localhost:3001/users/by-ids/${assigneeIds.join(',')}`);
    const assignees = assigneesResponse.data;
    if (assignees.length !== assigneeIds.length) {
      throw new Error('Không tìm thấy một số người nhận công việc');
    }

    const teamResponse = await axios.get(`http://localhost:3003/teams/${teamId}`);
    const team = teamResponse.data;
    if (!team) {
      throw new Error('Không tìm thấy nhóm');
    }

    const task = this.taskRepository.create({
      ...taskData,
      createdById,
      assigneeIds,
      teamId,
    });

    return this.taskRepository.save(task);
  }

  async findAll() {
    const tasks = await this.taskRepository.find();
    return Promise.all(tasks.map(task => this.enrichTask(task)));
  }

  async findByTeam(teamId: number) {
    const tasks = await this.taskRepository.find({ where: { teamId } });
    return Promise.all(tasks.map(task => this.enrichTask(task)));
  }

  async findByTeamAndUser(teamId: number, userId: number) {
    const tasks = await this.taskRepository.find({ where: { teamId } });
    const filteredTasks = tasks.filter(task => task.assigneeIds.includes(userId));
    return Promise.all(filteredTasks.map(task => this.enrichTask(task)));
  }

  async findOne(id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Không tìm thấy công việc');
    }
    return this.enrichTask(task);
  }

  private async enrichTask(task: Task) {
    const createdByResponse = await axios.get(`http://localhost:3001/users/${task.createdById}`);
    const assigneesResponse = await axios.get(`http://localhost:3001/users/by-ids/${task.assigneeIds.join(',')}`);
    const teamResponse = await axios.get(`http://localhost:3003/teams/${task.teamId}`);

    return {
      ...task,
      createdBy: createdByResponse.data,
      assignees: assigneesResponse.data,
      team: teamResponse.data,
    };
  }
}