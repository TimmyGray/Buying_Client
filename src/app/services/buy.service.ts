import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class BuyService {

  url: string = "https://localhost:7036";
  errormsg: string = "";
  constructor(private client: HttpClient) { }

  GetMsg() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.client.get(this.url, { headers, observe: "body", responseType: "json" })

  }

  SendMsg(msg: Message) {

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.client.post(this.url + '/postmsg', msg as Message, { headers });
    
  }

}
