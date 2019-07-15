import {HttpService, Injectable} from '@nestjs/common';
import {CheerioService} from "./cheerio.service";
import {CarService} from "./car.service";
import {Car} from "../interfaces/car.interface";

@Injectable()
export class PageService {
    constructor(private http: HttpService,
                private cheerioService: CheerioService,
                private carService: CarService) {
    }


    async processPage(url: string): Promise<Array<Car>> {
        const html = await this.http.get(url).toPromise();
        let page = this.cheerioService.parse(html.data);
        return this.carService.processCars(page);
    }
    getLastPage(page) {
        console.log(page('.pagination').find('.last').find('a').text());
    }
}
