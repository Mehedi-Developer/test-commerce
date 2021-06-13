import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //🎁 Validation
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);
  await app.listen(3001);
}
bootstrap();
