import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import bodyParser = require("body-parser");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  await app.listen(3000);
}
bootstrap();
