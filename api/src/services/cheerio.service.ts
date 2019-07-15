import { Injectable } from '@nestjs/common';
const cheerio = require('cheerio');

@Injectable()
export class CheerioService {
    public parse(body: string) {
        return cheerio.load(body);
    }
}
