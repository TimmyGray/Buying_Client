import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Buy } from '../models/Buy';
import { environment } from '../../environments/environment';

@Injectable()
export class BuyService {

  private url: string = environment.apiUrl+"/buys";
  constructor(private client: HttpClient) { }

  /** Loads catalogue buys and normalizes legacy payload fields from backend responses. */
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

  /** Downloads a buy image binary payload from the backend image endpoint. */
  getImage(id: string): Observable<Blob> {
    return this.client.get(`${this.url}/image/${id}`, { responseType: "blob" });

  }

  

  

}
