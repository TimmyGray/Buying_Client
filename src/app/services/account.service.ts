import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Client } from "../models/client";
import { environment } from '../../environments/environment';

@Injectable()
export class AccountService {

  private readonly url: string = environment.apiUrl+"/clients";
  constructor(private readonly httpclient: HttpClient) { }

  /** Loads a client by id. */
  getClient(id: string): Observable<Client> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.get<Client>(this.url + `/${id}`, { observe: "body", headers: httpheaders, responseType: "json" });

  }

  /** Creates or upserts a client using backend contract fields. */
  postClient(client: Client): Observable<Client> {

    const payload = { id: client.id, name: client.name, email: client.email };
    return this.httpclient.post<Client>(this.url, payload);

  }

  /** Deletes a client by id. */
  deleteClient(id: string): Observable<any> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.delete<any>(this.url + `/${id}`, { observe: "body", headers: httpheaders, responseType: "json" });

  }

}
