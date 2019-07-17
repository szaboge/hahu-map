import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../../../../api/src/interfaces/location.interface';
import { Car } from '../interfaces/car.interface';
import { takeLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PageService {

  constructor(private http: HttpClient) {

  }

  async processHtml(page: Document): Promise<Array<Car>> {
    let ads: NodeListOf<Element> = page.querySelectorAll('.cim-kontener');
    let cars: Array<Car> = [];

    for (let i = 0; i < ads.length; i++) {
      let element = ads[i].getElementsByTagName('a').item(0);

      const href = element.href;
      const title = element.innerText;
      const car = await this.fetchCar(href);
      cars.push({ ...car, url: href, title });
    }
    return cars;
  }

  public async processPage(url: string): Promise<Array<Car>> {
    let page: Document = await this.fetchPage(url);
    return this.processHtml(page);
  }

  async fetchCar(url: string): Promise<Car> {
    let page: string = await this.fetchUrl(url);
    let document: Document = new DOMParser().parseFromString(page, 'text/html');
    let table: HTMLTableElement = document.querySelector('.hirdetesadatok');

    let location = this.parseLocation(page);
    let image: HTMLImageElement = document.querySelector('.adatlap-kepek-placeholder-image');
    let price = this.findRow(table, 'Vételár');
    let km = this.findRow(table, 'Kilométeróra');

    return { location, imageUrl: image.src, price, km };
  }

  findRow(table: HTMLTableElement, name: string): string {
    let i = 0;
    while (!table.rows.item(i).cells.item(0).innerText.includes(name)
    && i < table.rows.length) {
      i++;
    }

    if (i < table.rows.length) return table.rows.item(i).cells.item(1).innerText;
    else return '';
  }

  async fetchPage(url: string): Promise<Document> {
    let html = await this.fetchUrl(url);
    return new DOMParser().parseFromString(html, 'text/html');
  }

  async fetchUrl(url: string): Promise<string> {
    return this.http.get(url, { responseType: 'text' }).toPromise();
  }

  private parseLocation(html: string): Location {
    const regex = new RegExp(/map\.setView\(\[(.*),(.*)]/gm);
    const result = regex.exec(html);
    return { lat: +result[1], lng: +result[2] };
  }
}
