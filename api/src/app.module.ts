import {HttpModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {CheerioService} from "./services/cheerio.service";
import {CarService} from "./services/car.service";
import {PageService} from "./services/page.service";

@Module({
    imports: [HttpModule],
    controllers: [AppController],
    providers: [CheerioService, CarService, PageService],
})
export class AppModule {
}
