import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Connector } from "../models/connector";
import { environment } from '../../environments/environment';


@Injectable()
export class ConnetorService {

  private url: string =environment.apiUrl+"/connectors";

  constructor(private client: HttpClient) { }

  getConnectors(): Observable<Connector[]> {

    const headers: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.client.get<Connector[]>(this.url, { headers, observe: "body", responseType: "json" });

  }

}
