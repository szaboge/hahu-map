import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "../../../../api/src/interfaces/location.interface";

@Injectable({
  providedIn: 'root'
})
export class PageService {

  constructor(private http: HttpClient) {

  }

  public async processPage(url: string) {
    let page: Document = await this.fetchPage(url);
    let ads: NodeListOf<Element> = page.querySelectorAll(".cim-kontener");


    for (let i = 0; i < ads.length; i++) {
      let element = ads[i].getElementsByTagName('a').item(0);

      const href = element.href;
      const title = element.innerText;

      await this.fetchCar(href);
    }
  }

  async fetchCar(url: string) {
    let page: Document = await this.fetchPage(url);
  }

  async fetchPage(url: string): Promise<Document> {
    let html = await this.fetchUrl(url);
    return new DOMParser().parseFromString(html, "text/html")
  }

  async fetchUrl(url: string): Promise<string> {
    return this.http.get(url, {responseType: 'text'}).toPromise();
  }

  private parseLocation(html: string): Location {
    const regex = new RegExp(/map\.setView\(\[(.*),(.*)]/gm);
    const result = regex.exec(html);
    return {lat: +result[1], lng: +result[2]};
  }
}
