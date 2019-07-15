import {HttpModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CheerioService} from "./services/cheerio.service";

@Module({
    imports: [HttpModule],
    controllers: [AppController],
    providers: [AppService, CheerioService],
})
export class AppModule {
}
