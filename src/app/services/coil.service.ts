import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CoilService {

  private url: string = 'https://localhost:7036/coils';

  constructor(private httpclient: HttpClient) { }

  getCoils(): Observable<string[]> {

    return this.httpclient.get<string[]>(this.url);

  }


}
