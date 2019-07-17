import {Component, OnInit} from '@angular/core';
import {MapService} from '../../services/map.service';
import {Location} from '../../interfaces/location.interface';
import {Car} from '../../interfaces/car.interface';
import L, { icon, Marker } from 'leaflet';

const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';

const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map;
  hungaryLocation: Location = {lat: 47.1580636, lng: 19.4521628};

  constructor(private mapService: MapService) {
  }

  ngOnInit() {
    this.map = L.map('map').setView([this.hungaryLocation.lat, this.hungaryLocation.lng], 8.36);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.mapService.newMarker.subscribe((car: Car) => {
      this.addMarker(car);
    });
  }

  addMarker(car: Car) {
    let marker = L.marker([car.location.lat, car.location.lng]).addTo(this.map);
    marker.bindPopup(this.popUpHtml(car));
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
