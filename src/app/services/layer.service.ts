import {Injectable} from '@angular/core';
import {Layer, LayerType} from "../interfaces/layer.inteface";
import {v4 as uuid} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class LayerService {
  layers: Array<Layer> = [];

  constructor() {
  }

  addNewHtmlLayer(html: string) {
    this.layers.push({id: uuid(), html, type: LayerType.HTML});
  }

  addNewUrlLayer(url: string) {
    this.layers.push({id: uuid(), url, type: LayerType.URL});
  }

  removeLayer(layer: Layer) {
    const index = this.layers.indexOf(layer);
    if (index !== -1) this.layers.splice(index, 1);
  }
}
