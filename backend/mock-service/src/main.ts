import { NestFactory } from '@nestjs/core';
import { AppModule } from './functions/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.MOCK_SERVICE_PORT ?? 3001);
}
void bootstrap();
