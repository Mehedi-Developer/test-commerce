import { setupSwagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RolesGuard } from './auth/roles.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //🎁 Validation
  app.useGlobalPipes(new ValidationPipe());
  // Guard
  app.useGlobalGuards()
  setupSwagger(app);
  await app.listen(3001);
}
bootstrap();
