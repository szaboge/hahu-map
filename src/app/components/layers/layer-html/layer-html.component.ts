import { Component, Input, OnInit } from '@angular/core';
import { PageService } from '../../../services/page.service';
import { CarService } from '../../../services/car.service';
import { AppService } from '../../../services/app.service';
import { LayerComponent } from '../layer/layer.component';

@Component({
  selector: 'app-layer-html',
  templateUrl: '../layer/layer.component.html',
  styleUrls: ['../layer/layer.component.scss'],
})
export class LayerHtmlComponent extends LayerComponent implements OnInit {
  @Input() html: string;

  actual: number = 0;
  max: number = 0;

  constructor(public pageService: PageService,
              public car: CarService,
              public app: AppService) {
    super(pageService, car, app);
  }

  ngOnInit() {
    this.processPage(this.html);
    this.title = 'Parking';
  }

}
