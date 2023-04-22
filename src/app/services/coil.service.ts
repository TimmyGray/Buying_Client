import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Coil } from "../models/coil"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class CoilService {

  private url: string = environment.apiUrl+'/coils';

  constructor(private httpclient: HttpClient) { }

  getCoils(): Observable<Coil[]> {

    return this.httpclient.get<Coil[]>(this.url);

  }


}
