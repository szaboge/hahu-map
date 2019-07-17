import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Car} from '../interfaces/car.interface';
import {CarService} from "./car.service";

@Injectable({
  providedIn: 'root',
})
export class PageService {

  constructor(private http: HttpClient, private car: CarService) {

  }

  async process(url: string): Promise<Array<Car>> {
    let page: Document = await this.fetchPage(url);
    let pageCount: number = this.getPageCount(page);
    let cars = [];

    if (pageCount > 1) {
      cars = await this.processHtml(page);
      for (let i = 2; i <= pageCount; i++) {
        let pageUrl = `${url}/page${i}`;
        cars = [...cars, ...(await this.processPage(pageUrl))];
      }
      return cars;
    } else {
      return this.processHtml(page);
    }
  }

  async processHtml(page: Document): Promise<Array<Car>> {
    let ads: NodeListOf<Element> = page.querySelectorAll('.cim-kontener');
    let cars: Array<Car> = [];

    for (let i = 0; i < ads.length; i++) {
      let car = await this.car.processCar(ads[i]);
      cars.push(car);
    }
    return cars;
  }

  public async processPage(url: string): Promise<Array<Car>> {
    let page: Document = await this.fetchPage(url);
    return this.processHtml(page);
  }

  async fetchPage(url: string): Promise<Document> {
    let html = await this.fetchUrl(url);
    return new DOMParser().parseFromString(html, 'text/html');
  }

  async fetchUrl(url: string): Promise<string> {
    return this.http.get(url, {responseType: 'text'}).toPromise();
  }

  getPageCount(page: Document): number {
    let li: Element = page.querySelector('.last');
    if (li) return +li.querySelector('a').textContent;
    else return 1;
  }
}
