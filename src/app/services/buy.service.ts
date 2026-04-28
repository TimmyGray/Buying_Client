import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Buy } from '../models/Buy';
import { environment } from '../../environments/environment';

@Injectable()
export class BuyService {

  private url: string = environment.apiUrl+"/buys";
  constructor(private client: HttpClient) { }

  /**
   * Supports both modern `itemId` and legacy `itemid` payload names
   * while backend contracts are being standardized.
   */
  private getItemId(raw: Partial<Buy>): string {
    return raw.itemId ?? (raw as Buy & { itemid?: string }).itemid ?? '';
  }

  private normalizeBuy(raw: Partial<Buy>): Buy {
    return {
      id: raw.id ?? '',
      name: raw.name ?? '',
      description: raw.description ?? '',
      cost: raw.cost ?? 0,
      item: raw.item ?? '',
      itemId: this.getItemId(raw),
      count: raw.count ?? 0,
      image: {
        id: raw.image?.id ?? '',
        name: raw.image?.name ?? '',
        size: raw.image?.size ?? 0,
        type: raw.image?.type ?? '',
        data: raw.image?.data ?? '',
      },
      custom: raw.custom ?? false,
    };
  }

  /** Loads catalogue buys and normalizes legacy payload fields from backend responses. */
  getBuys(): Observable<Buy[]> {
    return this.client.get<Buy[] | null>(this.url).pipe(
      map((buys) => {
        const safeBuys = Array.isArray(buys) ? buys : [];
        return safeBuys.map((buy) => this.normalizeBuy(buy));
      })
    );

  }

  /** Downloads a buy image binary payload from the backend image endpoint. */
  getImage(id: string): Observable<Blob> {
    return this.client.get(`${this.url}/image/${id}`, { responseType: "blob" });

  }

  

  

}
