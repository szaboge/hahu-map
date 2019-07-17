import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Car } from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public newMarker = new Subject<Car>();
  constructor() {

  }
}
