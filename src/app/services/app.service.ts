import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Car } from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public newMarker = new Subject<Car>();
  public newLayer = new Subject<string>();
  public newLayerHtml = new Subject<string>();
  constructor() {}

}
