import {HttpService, Injectable} from '@nestjs/common';
import {Car} from "../interfaces/car.interface";
import {Location} from "../interfaces/location.interface";

@Injectable()
export class CarService {
    constructor(private http: HttpService) {
    }

    async processCars(page): Promise<Array<Car>> {
        let partialCars: Array<Partial<Car>> = this.parseCars(page);
        return this.fetchCars(partialCars);
    }

    parseCars(page): Array<Partial<Car>> {
        const cars: Array<Partial<Car>> = [];
        const titles = page('.cim-kontener').toArray();

        titles.forEach((titleHtml) => {
            const url = page(titleHtml).find('a').attr('href');
            const title = page(titleHtml).find('a').text();
            cars.push({url,title});
        });
        return cars;
    }

    async fetchCars(partialCars: Array<Partial<Car>>): Promise<Array<Car>> {
        let cars: Array<Car> = [];
        for (let car of partialCars) {
            let html = await this.http.get(car.url).toPromise();
            let location: Location = this.parseLocation(html.data);
            cars.push({title: car.title, url: car.url, location: location, price: '0'});
        }

        return cars;
    }

    private parseLocation(html: string): Location {
        const regex = new RegExp(/map\.setView\(\[(.*),(.*)]/gm);
        const result = regex.exec(html);
        return {lat: +result[1], lng: +result[2]};
    }


}
