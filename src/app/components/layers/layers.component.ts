import { Component, OnInit } from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {

  layers: Array<string> = [];
  layersHtml: Array<string> = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.newLayer.subscribe(url => this.layers.push(url));
    this.appService.newLayerHtml.subscribe(html => this.layersHtml.push(html));
  }

}
