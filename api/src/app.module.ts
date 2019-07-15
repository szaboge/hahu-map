import {HttpModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CheerioService} from "./services/cheerio.service";
import {CarService} from "./services/car.service";
import {PageService} from "./services/page.service";

@Module({
    imports: [HttpModule],
    controllers: [AppController],
    providers: [AppService, CheerioService, CarService, PageService],
})
export class AppModule {
}
