import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Connector } from "../models/connector";

@Injectable()
export class ConnetorService {

  private url: string = "https://localhost:7036/connectors";

  constructor(private client: HttpClient) { }

  getConnectors(): Observable<string[]> {

    const headers: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });

    return this.client.get<string[]>(this.url, { headers, observe: "body", responseType: "json" });

  }

}
