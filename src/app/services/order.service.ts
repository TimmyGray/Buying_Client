import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable()
export class OrderService {

  url: string = "https://localhost:7036/orders";

  constructor(private httpclient: HttpClient) { }

  getOrders(clientName: string): Observable<Order[]> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.get<Order[]>(this.url + `/${clientName}`, { observe: "body", headers: httpheaders });

  }

  getOrder(clientName: string, orderId: string):Observable<Order> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.get<Order>(this.url + `/${clientName}/${orderId}`, { observe: "body", headers: httpheaders });

  }

  postOrder(order: Order): Observable<Order> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.post<Order>(this.url, JSON.stringify(order), { headers: httpheaders });

  }

  checkClient(clientName: string, clientEmail: string): Observable<any> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.get<any>(this.url + `/${clientName}/${clientEmail}`, { headers: httpheaders });

  }

  //service methods(only for develop)

  putOrder(order: Order): Observable<Order> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.put<Order>(this.url, JSON.stringify(order), { headers: httpheaders });

  }

  deleteOrder(orderId: string): Observable<any> {

    return this.httpclient.delete<any>(this.url + `/${orderId}`);

  }

}
