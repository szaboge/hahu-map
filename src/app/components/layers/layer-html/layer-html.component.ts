import { Component, Input, OnInit } from '@angular/core';
import { PageService } from '../../../services/page.service';
import { CarService } from '../../../services/car.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-layer-html',
  templateUrl: './layer-html.component.html',
  styleUrls: ['./layer-html.component.scss']
})
export class LayerHtmlComponent implements OnInit {
  @Input() html: string;

  actual: number = 0;
  max: number = 0;

  constructor(private pageService: PageService, private car: CarService, private app: AppService) { }

  ngOnInit() {
    this.processPage(this.html);
  }

  processPage = (html: string) => {
    let page: Document = this.pageService.parsePage(html);
    let ads: NodeListOf<Element> = page.querySelectorAll('.cim-kontener');
    this.max += ads.length;
    for (let i = 0; i < ads.length; i++) {
      this.processCar(ads[i]);
    }
  };

  processCar(ad: Element) {
    let element = ad.getElementsByTagName('a').item(0);

    const href = element.href;
    const title = element.innerText;

    this.pageService.fetchUrl(href).subscribe((html) => {
      let car = this.car.parseCar(html);
      car = { ...car, url: href, title };
      this.app.newMarker.next(car);
      this.actual++;
    });
  }

}
