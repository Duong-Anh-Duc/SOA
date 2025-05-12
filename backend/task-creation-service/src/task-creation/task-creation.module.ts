import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventStoreService } from 'src/event-store/event-store.service';
import { EventEntity } from 'src/event-store/event.entity';
import { CreateTaskHandler } from './commands/handlers/create-task.handler';
import { TaskCreationController } from './task-creation.controller';
import { TaskCreationService } from './task-creation.service';

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
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
          retryAttempts: 3,
          retryDelay: 1000,
        },
      },
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
    ]),
  ],
  controllers: [TaskCreationController],
  providers: [TaskCreationService, EventStoreService, CreateTaskHandler],
})
export class AppModule {}