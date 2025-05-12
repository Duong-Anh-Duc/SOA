import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', 
      host: 'localhost',
      port: 3306, 
      username: 'root',
      password: 'duckhiemcg',
      database: 'SOA',
      entities: [User],
      synchronize: false,
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}