import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as Sentry from '@sentry/node';
import { Integrations as TracingIntegrations } from '@sentry/tracing';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [new Sentry.Integrations.Http({ tracing: true }), new TracingIntegrations.Prisma()],
        tracesSampleRate: 1.0,
    });

    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(Sentry.Handlers.errorHandler());

    const config = new DocumentBuilder()
        .setTitle('PlayARR API')
        .setVersion('1.0.0')
        .build();
    const doc = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api-docs', app, doc);

    await app.listen(3000);
}
bootstrap();
