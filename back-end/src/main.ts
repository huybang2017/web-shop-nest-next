import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SuccessResponseFilter } from './utlis/exception-filter/success-response.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Web shop api')
    .setDescription('The web api was built by nest')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Web shop api',
  });
  app.useGlobalInterceptors(new SuccessResponseFilter());
  await app.listen(8000);
}
bootstrap();
