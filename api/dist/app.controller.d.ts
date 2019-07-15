import { HttpService } from '@nestjs/common';
import { AppService } from './app.service';
import { CheerioService } from "./services/cheerio.service";
import { Location } from "./interfaces/location.interface";
export declare class AppController {
    private readonly appService;
    private httpService;
    private cheerioService;
    search: string;
    locations: Array<Location>;
    constructor(appService: AppService, httpService: HttpService, cheerioService: CheerioService);
    getLocations(): Promise<Location[]>;
    fetch(url: string): Promise<import("axios").AxiosResponse<any>>;
    getLastPage(page: any): void;
    parsePage(page: any): Promise<void>;
    parseLocation(body: any): void;
}
