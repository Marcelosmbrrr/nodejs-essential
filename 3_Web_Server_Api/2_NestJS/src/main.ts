import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ExceptionsHandler } from './common/exception-handler/exceptions-handler.filter';

// Adds:
// Hot reload (webpack): https://docs.nestjs.com/recipes/hot-reload
// Cors: https://docs.nestjs.com/security/cors
// Global Pipes - ValidationPipe - set auto-validation to requests that uses an dto - https://docs.nestjs.com/techniques/validation#auto-validation - 
// Exceptions handler - handle all expcetions in one place: https://docs.nestjs.com/exception-filters

async function bootstrap() {

  // App instance
  const app = await NestFactory.create(AppModule);

  // Adds
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: "*",
    credentials: true,
  });
  app.useGlobalFilters(new ExceptionsHandler());

  // Init server
  await app.listen(3000);

}
bootstrap();
