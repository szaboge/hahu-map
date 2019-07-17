import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';
import { Location } from '../../interfaces/location.interface';
import { Car } from '../../interfaces/car.interface';

declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  map;


  hungaryLocation: Location = { lat: 47.1580636, lng: 19.4521628 };

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
