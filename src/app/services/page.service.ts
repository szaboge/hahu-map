import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PageService {

  constructor(private http: HttpClient) {

  }

  parsePage(html: string) {
    return new DOMParser().parseFromString(html, 'text/html');
  }

  fetchUrl(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }

  getPageCount(page: Document): number {
    let li: Element = page.querySelector('.last');
    if (li) return +li.querySelector('a').textContent;
    else return 1;
  }
}
