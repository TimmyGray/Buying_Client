import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { Buy } from '../models/Buy';
import { environment } from '../../environments/environment';

@Injectable()
export class BuyService {

  private url: string = environment.apiUrl+"/buys";
  constructor(private client: HttpClient) { }

  getBuys(): Observable<Buy[]> {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.client.get<Buy[]>(this.url, { headers, observe: "body", responseType: "json" });

  }

  getImage(id: string,type:string): Observable<Blob> {

    console.log(id);
    console.log(type);
    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": `image/${type}` });
    return this.client.get(`${this.url}/getimage/${id}`, { headers: httpheaders, responseType: "blob" });

  }

  

  

}
