import { NestFactory } from '@nestjs/core';
import * as cors from 'cors';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Thêm middleware CORS
  app.use(cors({
    origin: 'http://localhost:5173', // Cho phép frontend từ cổng 5173
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }));

  await app.listen(3006);
  console.log('Gateway is running on port 3006');
}
bootstrap();