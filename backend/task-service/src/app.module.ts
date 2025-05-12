import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskHandler } from './task/commands/handlers/create-task.handler';
import { Task } from './task/entities/task.entity';
import { GetTasksHandler } from './task/queries/handlers/get-tasks.handler';
import { TaskService } from './task/task.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: '123456',
      database: 'SOA',
      entities: [Task],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Task]),
    CqrsModule,
  ],
  providers: [TaskService, GetTasksHandler, CreateTaskHandler],
})
export class AppModule {}