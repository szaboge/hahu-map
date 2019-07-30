import {Component, OnInit} from '@angular/core';

import {LayerService} from "../../services/layer.service";

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {
  constructor(public layerService: LayerService) {
  }

  ngOnInit() {
  }

}
