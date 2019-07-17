import { Injectable } from '@angular/core';
import {Car} from "../interfaces/car.interface";
import {Location} from "../interfaces/location.interface";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  async processCar(ad: Element): Promise<Car> {
    let element = ad.getElementsByTagName('a').item(0);

    const href = element.href;
    const title = element.innerText;
    const car = await this.fetchCar(href);

    return { ...car, url: href, title };
  }

  async fetchCar(url: string): Promise<Car> {
    let page: string = await this.fetchUrl(url);
    let document: Document = new DOMParser().parseFromString(page, 'text/html');
    let table: HTMLTableElement = document.querySelector('.hirdetesadatok');

    let location = this.parseLocation(page);
    let image: HTMLImageElement = document.querySelector('.adatlap-kepek-placeholder-image');
    let src = image ? image.src : '';
    let price = this.findRow(table, 'Vételár');
    let km = this.findRow(table, 'Kilométeróra');

    return { location, imageUrl: src, price, km };
  }

  async fetchUrl(url: string): Promise<string> {
    return this.http.get(url, { responseType: 'text' }).toPromise();
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

  private parseLocation(html: string): Location {
    const regex = new RegExp(/map\.setView\(\[(.*),(.*)]/gm);
    const result = regex.exec(html);
    return { lat: +result[1], lng: +result[2] };
  }
}
