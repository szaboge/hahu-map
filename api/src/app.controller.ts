import {BadRequestException, Controller, Get, Param, Post, Query, Req} from '@nestjs/common';
import {AppService} from './app.service';
import {PageService} from "./services/page.service";
import * as rawbody from 'raw-body';

@Controller()
export class AppController {

    constructor(private readonly appService: AppService,
                private pageService: PageService) {
    }

    @Get('locations/saved')
    async getLocations(@Query('url') param) {
        if (param) return await this.pageService.processUrl(param);
        else throw new BadRequestException();
    }

    @Post('locations/favorite')
    async getLocationByHtml(@Req() req) {
        const body = (await rawbody(req)).toString();
        return await this.pageService.processHtml(body);
    }
}
