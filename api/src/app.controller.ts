import {Controller, Get, Post, Query, Req} from '@nestjs/common';
import {PageService} from "./services/page.service";
import * as rawbody from 'raw-body';

@Controller()
export class AppController {

    constructor(private pageService: PageService) {
    }

    @Get('locations/saved')
    async getLocations(@Query('url') param) {
        if (param) return await this.pageService.processUrl(param);
    }

    @Post('locations/favorite')
    async getLocationByHtml(@Req() req) {
        const body = (await rawbody(req)).toString();
        return await this.pageService.processHtml(body);
    }
}
