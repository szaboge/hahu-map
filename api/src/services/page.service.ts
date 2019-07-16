import {BadRequestException, HttpService, Injectable} from '@nestjs/common';
import {CheerioService} from "./cheerio.service";
import {CarService} from "./car.service";
import {Car} from "../interfaces/car.interface";

@Injectable()
export class PageService {
    constructor(private http: HttpService,
                private cheerioService: CheerioService,
                private carService: CarService) {
    }


    async processUrl(url: string): Promise<Array<Car>> {
        const html = await this.http.get(url).toPromise();
        let page = this.cheerioService.parse(html.data);
        return this.carService.processCars(page);
    }

    async processHtml(html: string) {
        let page;
        try {
            page = this.cheerioService.parse(html);
        } catch (e) {
            throw new BadRequestException();
        }

        return this.carService.processCars(page);
    }
    getLastPage(page) {
        console.log(page('.pagination').find('.last').find('a').text());
    }
}
