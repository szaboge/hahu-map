import {Component, Input, OnInit} from '@angular/core';
import {PageService} from 'services/page.service';
import {CarService} from 'services/car.service';
import {MapService} from 'services/map.service';
import {Layer, LayerType} from "interfaces/layer.inteface";
import {LayerService} from "services/layer.service";

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements OnInit {
  @Input() layer: Layer;
  actual: number = 0;
  max: number = 0;
  title: string = '';
  markers = [];

  constructor(private pageService: PageService,
              private layerService: LayerService,
              private car: CarService,
              private map: MapService) {
  }

  ngOnInit(): void {
    if (this.layer.type === LayerType.HTML) {
      this.processPage(this.layer.html);
      this.title = 'Parking';
    } else {
      this.pageService.fetchUrl(this.layer.url).subscribe((html: string) => {
        this.processFirstPage(html, this.layer.url);
      });
      this.title = this.layer.url;
    }
  }

  processFirstPage(html: string, url: string) {
    let page: Document = this.pageService.parsePage(html);
    let pageCount: number = this.pageService.getPageCount(page);

    if (pageCount > 1) {
      this.processPage(html);
      for (let i = 2; i <= pageCount; i++) {
        let pageUrl = `${url}/page${i}`;
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
      car = {...car, url: href, title};
      this.markers.push(this.map.addNewMarker(car));
      this.actual++;
    });
  }

  removeMarkers() {
    this.markers.forEach((marker) => {
      marker.remove();
    });
    this.layerService.removeLayer(this.layer);
  }
}
