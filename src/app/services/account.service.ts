import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { observable, Observable } from "rxjs";
import { Client } from "../models/client";
import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {

  private readonly url: string = environment.apiUrl+"/clients";
  constructor(private readonly httpclient: HttpClient) { }

  getClient(id: string): Observable<Client> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.get<Client>(this.url + `/${id}`, { observe: "body", headers: httpheaders, responseType: "json" });

  }

  postClient(newClieent: Client): Observable<Client> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json"});
    return this.httpclient.post<Client>(this.url, JSON.stringify(newClieent), { headers: httpheaders });

  }

  deleteClient(id: string): Observable<any> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.delete<any>(this.url + `/${id}`, { observe: "body", headers: httpheaders, responseType: "json" });

  }

}
