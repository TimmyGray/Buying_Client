import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ClientsIndentityService } from '../services/clients_indentity.service';

//@Injectable({
//  providedIn: 'root'
//})
//export class JwtTokenInterceptor implements HttpInterceptor {

//  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//        throw new Error('Method not implemented.');
//    }




//}
