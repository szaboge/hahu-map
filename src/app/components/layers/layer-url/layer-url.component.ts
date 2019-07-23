import { Component, Input, OnInit } from '@angular/core';
import { LayerComponent } from '../layer/layer.component';
import { PageService } from '../../../services/page.service';
import { CarService } from '../../../services/car.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-layer-url',
  templateUrl: '../layer/layer.component.html',
  styleUrls: ['../layer/layer.component.scss'],
})
export class LayerUrlComponent extends LayerComponent implements OnInit {
  @Input() url: string = '';

  constructor(public pageService: PageService,
              public car: CarService,
              public map: AppService) {
    super(pageService, car, map);
  }

  ngOnInit() {
    this.pageService.fetchUrl(this.url).subscribe((html: string) => {
      this.processFirstPage(html, this.url);
    });
    this.title = this.url;
  }
}
