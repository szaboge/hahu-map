const request = require("request");
const cheerio = require('cheerio');
let locations = [];

const search = 'https://www.hasznaltauto.hu/talalatilista/PDNG2VG3R2NTAEH5C57UAFKIJB3L3D4VFL2SLP4AEZSSBDTPSFW5BBSV726WGTCTZSJJPDGOTHFZTCYBXYX7TF7HIXEZTBEATV2QFTRYWAH4ECWO7SEBVVID7JQCP2GADGUNZ4J44NL6CGQM5ADWRQEP5TR4E53TSKAWABNO23BMIJB3Z3MJVAOPBCOTQK2O2WHH5E2DYUM7NLWOYLHVWREMNZ4LKP5674UKW73SJCCACFPKDM4N2T7ZFD57IT3FHJYGB7QIKDBG6OEUWFYVBVTMOBKPXAQO2UKYHXNAL6B3BP7AC3QANM3ENK5CLMJUTLPY3HNR4KCS26S3QKY26442RNB57K7AMMGVEV5EAG623J762O5TNBIQUXAUTKCFGPDRZS3IXQJW4G2UNITPMRF4JUGEKBDR576Q3VLKJM4FBHYQG33POYWS7ZTINZCKGGEBAEYBRXTEWTFHICSYVEUEH7JYIW52VEIKIXVHZWUCYL3J57UR5QJ4UDFTFJ7JH6T4VIAU3RWYQ7EV6OBBPSJOUNOSM6Y75V63ED6RHYSLWSR2JHZRKTMHVZ3576WPXFGGTHANVXP4VGXOJDB2VPK6UHD66FFVI6ZVPKCHFOT7NJUXJFVYTL2PIOAPTUDWWOZ7K7UUOSFHFCI7HEJ55NXCOMERNBFCIIMZZVOW25YFDEAFYUNKVJ5TGNRATU5JJMSTJLC4APVHXVETKWMJ4DF2IGGNFGWHWDSGQTXI54V7DAZV6ZVJ33NSFS2D7SUB42A343VN5NAOSTGRFF6TF2HN7ZDZ7T57MONHMYQ';

request.get(search, (error, response, body) => {
    let page = cheerio.load(body);
    parsePage(page);
});


function parsePage(page) {
    let titles = page('.cim-kontener').toArray();
    let urls = [];
    titles.forEach((title) => {
        urls.push(page(title).find('a').attr('href'));
    });

    console.log(urls);

    urls.forEach((url) => {
        request.get(url, (error, response, body) => { parseLocation(error, response, body); });
    });
}




function parseLocation(error, response, body) {
    let page = cheerio.load(body);
    let text = page('.haicon-haz .contact-button-text').text();
    if (text.includes('Térkép megtekintése')) text = text.replace('Térkép megtekintése', '');
    text = text.trim();
    locations.push(text);
}

