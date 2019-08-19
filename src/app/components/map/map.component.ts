import {Component, OnInit} from '@angular/core';
import {MapService} from 'services/map.service';
import {Location} from 'interfaces/location.interface';
import {Map, tileLayer} from 'leaflet';

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
    this.map = new Map('map').setView([this.hungaryLocation.lat, this.hungaryLocation.lng], 8.36);
    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    this.mapService.map = this.map;
  }
}
