import { writeFileSync } from 'fs'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:5173', 'https://verification-control-service.vercel.app'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  }

  app.enableCors(corsOptions)

  const config = new DocumentBuilder()
    .setTitle('VSC')
    .setDescription(
      'API Documentation. You can download the JSON document <a href="/api/swagger-spec" target="_blank">here</a>. \n\n Or import it by URL http://localhost:3000/api/swagger-spec',
    )
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'VCS API',
  })

  writeFileSync('./swagger-spec.json', JSON.stringify(document))

  await app.listen(3000)
}
bootstrap()
