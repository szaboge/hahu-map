import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private map: MapService) {
  }

  ngOnInit() {
  }

  addMarker() {
    this.map.newMarker.next({ lat: 46.626368, lng: 18.8652409 });
  }
}
