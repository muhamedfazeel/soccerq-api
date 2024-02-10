import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MAX_JSON_REQUEST_SIZE } from './shared/constants';
import { name, description, version } from 'package.json';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: MAX_JSON_REQUEST_SIZE }),
  );
  const config = app.get<ConfigService>(ConfigService);
  const port = config.get('config.port');
  const env = config.get('config.env');
  const swaggerServer = config.get('config.swaggerServer');

  // TODO: Setup a logger

  // CORS
  if (env !== 'production') {
    app.enableCors({
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    });
  }

  // Swagger Configuration
  if (swaggerServer) {
    const options = new DocumentBuilder()
      .setTitle(name)
      .setDescription(`${description}\nRunning on ${env} Mode`)
      .setVersion(version)
      .addServer(`http://localhost:${port}`, 'Localhost')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
  }

  app.setGlobalPrefix('/api/v1');
  app.enableVersioning({ type: VersioningType.URI });

  await app.listen(port);
}
bootstrap();
