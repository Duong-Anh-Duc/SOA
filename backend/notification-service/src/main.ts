import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
      retryAttempts: 3,
      retryDelay: 1000,
    },
  });

  await app.listen();
  console.log('Notification Service is listening on Redis');
}
bootstrap();