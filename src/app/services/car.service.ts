import { Injectable } from '@angular/core';
import {Car} from '../interfaces/car.interface';
import {Location} from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  parseCar(page: string): Car {
    const document: Document = new DOMParser().parseFromString(page, 'text/html');
    const table: HTMLTableElement = document.querySelector('.hirdetesadatok');

    const location = this.parseLocation(page);
    const image: HTMLImageElement = document.querySelector('.adatlap-kepek-placeholder-image');
    const src = image ? image.src : '';
    const price = this.findRow(table, 'Vételár');
    const km = this.findRow(table, 'Kilométeróra');

    return { location, imageUrl: src, price, km };
  }

  private findRow(table: HTMLTableElement, name: string): string {
    let i = 0;
    while (table.rows.item(i) && !table.rows.item(i).cells.item(0).innerText.includes(name) && i < table.rows.length) {
      i++;
    }

    return i < table.rows.length ? table.rows.item(i).cells.item(1).innerText : '';
  }

  private parseLocation(html: string): Location {
    const regex = new RegExp(/\[(\d*\.\d*),(\d+\.\d+)\]/gm);
    const result = regex.exec(html);
    if (!regex) { return {lat: 0, lng: 0}; }
    return { lat: +result[1], lng: +result[2] };
  }
}
