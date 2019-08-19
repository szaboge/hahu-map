import {Injectable} from '@angular/core';
import {Car} from 'interfaces/car.interface';
import {Marker} from 'leaflet';
import {icons} from "components/map/marker-types";

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public set map(value) {
    this._map = value;
  }

  public get map() {
    return this._map;
  }

  private _map;

  constructor() {
  }

  addNewMarker(car: Car) {
    if (!this.map) return;
    let marker = new Marker([car.location.lat, car.location.lng], {icon: icons.blue}).addTo(this.map);
    marker.bindPopup(this.popUpHtml(car));
    return marker;
  }

  popUpHtml(car: Car): string {
    return `
    <span><b>${car.title}</b></span><br>
    <img src="${car.imageUrl}" height="150px" width="200px"></br>
    <span>Price: ${car.price}</span><br>
    <span>${car.km}</span><br>
    <a href="${car.url}" target="_blank">Open</a>    
    `;
  }

}
