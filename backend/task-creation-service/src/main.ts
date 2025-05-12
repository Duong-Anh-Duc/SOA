import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
      retryAttempts: 3,
      retryDelay: 1000,
    },
  });

  await app.startAllMicroservices();
  await app.listen(3002);
  console.log('Task Creation Service is running on port 3002 and connected to Redis');
}
bootstrap();