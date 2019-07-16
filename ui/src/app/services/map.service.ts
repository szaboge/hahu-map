import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Location } from '../interfaces/location.interface';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  public newMarker = new Subject<Location>();
  constructor() {

  }
}
