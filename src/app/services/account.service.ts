import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

  postClient(newClient: Client): Observable<Client> {

    const payload = { id: newClient.id, name: newClient.name, email: newClient.email };
    return this.httpclient.post<Client>(this.url, payload);

  }

  deleteClient(id: string): Observable<any> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.delete<any>(this.url + `/${id}`, { observe: "body", headers: httpheaders, responseType: "json" });

  }

}
