import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Buy } from '../models/Buy';

@Injectable()
export class BuyService {

  private url: string = "https://localhost:7036/buys";
  constructor(private client: HttpClient) { }

  getBuys(): Observable<Buy[]> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.client.get<Buy[]>(this.url, { headers, observe: "body", responseType: "json" });

  }

  

  

}
