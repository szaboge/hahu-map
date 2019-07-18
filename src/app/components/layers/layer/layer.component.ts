import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageService } from '../../../services/page.service';
import { HttpClient } from '@angular/common/http';
import { CarService } from '../../../services/car.service';
import { AppService } from '../../../services/app.service';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent implements OnInit, OnDestroy {

  @Input() url: string = '';

  actual: number = 0;
  max: number = 0;

  constructor(private pageService: PageService,
              private http: HttpClient,
              private car: CarService,
              private map: AppService) {
  }

  ngOnInit() {
    this.pageService.fetchUrl(this.url).subscribe((html: string) => {
      this.processFirstPage(html);
    });
  }

  ngOnDestroy(): void {
  }

  processFirstPage(html: string) {
    let page: Document = this.pageService.parsePage(html);
    let pageCount: number = this.pageService.getPageCount(page);

    if (pageCount > 1) {
      this.processPage(html);
      for (let i = 2; i <= pageCount; i++) {
        let pageUrl = `${this.url}/page${i}`;
        this.pageService.fetchUrl(pageUrl).subscribe(this.processPage);
      }
    } else {
      this.processPage(html);
    }
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
      this.map.newMarker.next(car);
      this.actual++;
    });
  }

}
