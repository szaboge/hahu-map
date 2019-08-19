import { Injectable } from '@angular/core';
import {Car} from "interfaces/car.interface";
import {Location} from "interfaces/location.interface";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor() { }

  parseCar(page: string): Car {
    let document: Document = new DOMParser().parseFromString(page, 'text/html');
    let table: HTMLTableElement = document.querySelector('.hirdetesadatok');

    let location = this.parseLocation(page);
    let image: HTMLImageElement = document.querySelector('.adatlap-kepek-placeholder-image');
    let src = image ? image.src : '';
    let price = this.findRow(table, 'Vételár');
    let km = this.findRow(table, 'Kilométeróra');

    return { location, imageUrl: src, price, km };
  }

  private findRow(table: HTMLTableElement, name: string): string {
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
