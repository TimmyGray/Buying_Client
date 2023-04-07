import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Price } from "../models/price";

@Injectable()
export class PriceService {

  private url: string = "https://localhost:7036/prices";

  constructor(private client: HttpClient) { }

  getPrices(): Observable<Price[]>{

    const headers: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.client.get<Price[]>(this.url, { headers, observe: "body", responseType: "json" });

  }
   
}
