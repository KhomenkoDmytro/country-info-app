import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api');
  const config = new DocumentBuilder()
    .setTitle('Countries & Holidays API')
    .setDescription('NestJS API that integrates with Nager.Date and CountriesNow')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
}
bootstrap();
