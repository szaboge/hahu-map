"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const cheerio_service_1 = require("./services/cheerio.service");
let AppController = class AppController {
    constructor(appService, httpService, cheerioService) {
        this.appService = appService;
        this.httpService = httpService;
        this.cheerioService = cheerioService;
        this.search = 'https://www.hasznaltauto.hu/talalatilista/PDNG2VG3R2NTAEH5C57UAFKIJB3L3D4VFL2SLP4AEZSSBDTPSFW5BBSV726WGTCTZSJJPDGOTHFZTCYBXYX7TF7HIXEZTBEATV2QFTRYWAH4ECWO7SEBVVID7JQCP2GADGUNZ4J44NL6CGQM5ADWRQEP5TR4E53TSKAWABNO23BMIJB3Z3MJVAOPBCOTQK2O2WHH5E2DYUM7NLWOYLHVWREMNZ4LKP5674UKW73SJCCACFPKDM4N2T7ZFD57IT3FHJYGB7QIKDBG6OEUWFYVBVTMOBKPXAQO2UKYHXNAL6B3BP7AC3QANM3ENK5CLMJUTLPY3HNR4KCS26S3QKY26442RNB57K7AMMGVEV5EAG623J762O5TNBIQUXAUTKCFGPDRZS3IXQJW4G2UNITPMRF4JUGEKBDR576Q3VLKJM4FBHYQG33POYWS7ZTINZCKGGEBAEYBRXTEWTFHICSYVEUEH7JYIW52VEIKIXVHZWUCYL3J57UR5QJ4UDFTFJ7JH6T4VIAU3RWYQ7EV6OBBPSJOUNOSM6Y75V63ED6RHYSLWSR2JHZRKTMHVZ3576WPXFGGTHANVXP4VGXOJDB2VPK6UHD66FFVI6ZVPKCHFOT7NJUXJFVYTL2PIOAPTUDWWOZ7K7UUOSFHFCI7HEJ55NXCOMERNBFCIIMZZVOW25YFDEAFYUNKVJ5TGNRATU5JJMSTJLC4APVHXVETKWMJ4DF2IGGNFGWHWDSGQTXI54V7DAZV6ZVJ33NSFS2D7SUB42A343VN5NAOSTGRFF6TF2HN7ZDZ7T57MONHMYQ';
        this.locations = [];
    }
    getLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            const body = yield this.fetch(this.search);
            let page = this.cheerioService.parse(body.data);
            this.getLastPage(page);
            yield this.parsePage(page);
            return this.locations;
        });
    }
    fetch(url) {
        return this.httpService.get(url).toPromise();
    }
    getLastPage(page) {
        console.log(page('.pagination').find('.last').find('a').text());
    }
    parsePage(page) {
        return __awaiter(this, void 0, void 0, function* () {
            let titles = page('.cim-kontener').toArray();
            let urls = [];
            titles.forEach((title) => {
                urls.push(page(title).find('a').attr('href'));
            });
            for (let url of urls) {
                yield this.fetch(url).then((body) => {
                    this.parseLocation(body.data);
                });
            }
        });
    }
    parseLocation(body) {
        const regex = new RegExp(/map\.setView\(\[(.*),(.*)]/gm);
        const result = regex.exec(body);
        this.locations.push({ lat: +result[1], lng: +result[2] });
    }
};
__decorate([
    common_1.Get('locations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getLocations", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        common_1.HttpService,
        cheerio_service_1.CheerioService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map