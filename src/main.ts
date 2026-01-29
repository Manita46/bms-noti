import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = app.get(ConfigService);
  const port = Number(config.get('PORT') ?? 3000);

   const configDocs = new DocumentBuilder()
    .setTitle('BMS-NOTI API')
    .setDescription('Internal Events + Notification Service')
    .setDescription('Internal event publisher')
    .setVersion('1.0')
    .addApiKey(
      { type: 'apiKey', name: 'x-api-key', in: 'header' },
      'api-key',
    )
    .build();

  
  const document = SwaggerModule.createDocument(app, configDocs);
  SwaggerModule.setup('docs', app, document); // http://localhost:3000/docs
  await app.listen(port);
  console.log(`BMS-NOTI (NestJS) running on http://localhost:${port}`);
}

bootstrap();
