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

  login(logFormInfo: any): Observable<Client> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.post<Client>(this.url + '/login', JSON.stringify(logFormInfo), { headers: httpheaders });

  }

  register(regFormInfo:any): Observable<object> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.post<object>(this.url + '/registration', JSON.stringify(regFormInfo), { headers: httpheaders });

  }

  deleteClient(id: string): Observable<any> {

    let token: string = sessionStorage.getItem('access_token') || '';
    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json", "Authorization": token });
    return this.httpclient.delete<any>(this.url + `/${id}`, { observe: "body", headers: httpheaders, responseType: "json" });

  }

}
