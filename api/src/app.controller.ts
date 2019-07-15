import {Controller, Get, HttpService} from '@nestjs/common';
import {AppService} from './app.service';
import {CheerioService} from "./services/cheerio.service";
import {Location} from "./interfaces/location.interface";

@Controller()
export class AppController {
    search = 'https://www.hasznaltauto.hu/talalatilista/PDNG2VG3R2NTAEH5C57UAFKIJB3L3D4VFL2SLP4AEZSSBDTPSFW5BBSV726WGTCTZSJJPDGOTHFZTCYBXYX7TF7HIXEZTBEATV2QFTRYWAH4ECWO7SEBVVID7JQCP2GADGUNZ4J44NL6CGQM5ADWRQEP5TR4E53TSKAWABNO23BMIJB3Z3MJVAOPBCOTQK2O2WHH5E2DYUM7NLWOYLHVWREMNZ4LKP5674UKW73SJCCACFPKDM4N2T7ZFD57IT3FHJYGB7QIKDBG6OEUWFYVBVTMOBKPXAQO2UKYHXNAL6B3BP7AC3QANM3ENK5CLMJUTLPY3HNR4KCS26S3QKY26442RNB57K7AMMGVEV5EAG623J762O5TNBIQUXAUTKCFGPDRZS3IXQJW4G2UNITPMRF4JUGEKBDR576Q3VLKJM4FBHYQG33POYWS7ZTINZCKGGEBAEYBRXTEWTFHICSYVEUEH7JYIW52VEIKIXVHZWUCYL3J57UR5QJ4UDFTFJ7JH6T4VIAU3RWYQ7EV6OBBPSJOUNOSM6Y75V63ED6RHYSLWSR2JHZRKTMHVZ3576WPXFGGTHANVXP4VGXOJDB2VPK6UHD66FFVI6ZVPKCHFOT7NJUXJFVYTL2PIOAPTUDWWOZ7K7UUOSFHFCI7HEJ55NXCOMERNBFCIIMZZVOW25YFDEAFYUNKVJ5TGNRATU5JJMSTJLC4APVHXVETKWMJ4DF2IGGNFGWHWDSGQTXI54V7DAZV6ZVJ33NSFS2D7SUB42A343VN5NAOSTGRFF6TF2HN7ZDZ7T57MONHMYQ';
    locations: Array<Location> = [];

    constructor(private readonly appService: AppService,
                private httpService: HttpService,
                private cheerioService: CheerioService) {
    }

    @Get('locations')
    async getLocations() {
        const body = await this.fetch(this.search);
        let page = this.cheerioService.parse(body.data);
        this.getLastPage(page);
        await this.parsePage(page);
        return this.locations;
    }

    fetch(url: string) {
        return this.httpService.get(url).toPromise();
    }

    getLastPage(page) {
        console.log(page('.pagination').find('.last').find('a').text());
    }


    async parsePage(page) {
        let titles = page('.cim-kontener').toArray();
        let urls = [];
        titles.forEach((title) => {
            urls.push(page(title).find('a').attr('href'));
        });

        for (let url of urls) {
            await this.fetch(url).then((body) => {
                this.parseLocation(body.data);
            });
        }
    }

    parseLocation(body) {
        const regex = new RegExp(/map\.setView\(\[(.*),(.*)]/gm);
        const result = regex.exec(body);
        this.locations.push({lat: +result[1], lng: +result[2]});
    }

}
