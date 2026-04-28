import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Buy } from '../models/Buy';
import { environment } from '../../environments/environment';

@Injectable()
export class BuyService {

  private url: string = environment.apiUrl+"/buys";
  constructor(private client: HttpClient) { }

  getBuys(): Observable<Buy[]> {
    return this.client.get<Buy[]>(this.url).pipe(
      map((buys) =>
        buys.map((buy) => ({
          ...buy,
          itemId: buy.itemId ?? (buy as Buy & { itemid?: string }).itemid ?? '',
          image: {
            ...buy.image,
            data: buy.image?.data ?? '',
          },
        }))
      )
    );

  }

  getImage(id: string): Observable<Blob> {
    return this.client.get(`${this.url}/image/${id}`, { responseType: "blob" });

  }

  

  

}
