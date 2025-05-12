import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreService } from './event-store/event-store.service';
import { EventEntity } from './event-store/event.entity';
import { CreateTaskHandler } from './task-creation/commands/handlers/create-task.handler';
import { TaskCreationController } from './task-creation/task-creation.controller';
import { TaskCreationService } from './task-creation/task-creation.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5434,
      username: 'postgres',
      password: '123456',
      database: 'SOA',
      entities: [EventEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([EventEntity]),
    CqrsModule,
    
    ClientsModule.register([
      {
        name: 'TASK_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
          retryAttempts: 3,
          retryDelay: 1000,
        },
      },
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
          retryAttempts: 3,
          retryDelay: 1000,
        },
      },
    ]),
  ],
  controllers: [TaskCreationController],
  providers: [TaskCreationService, EventStoreService, CreateTaskHandler],
})
export class AppModule {}