import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamModule } from './team/team.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/team_db'),
    TeamModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}