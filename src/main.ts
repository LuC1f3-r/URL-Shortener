import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xssClean from 'xss-clean';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Using security-related HTTP headers
  app.use(helmet());

  //Preventing XSS attacks here
  app.use(xssClean());

  // Enable CORS
  app.enableCors();

  // Register global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  //Rate Limiting
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, //limiting each IP to 100 requests per windows
    }),
  );
  await app.listen(3000);
}
bootstrap();
