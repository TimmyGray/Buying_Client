import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '../../environments/environment';


@Injectable()
export class OrderService {

  url: string = environment.apiUrl+"/orders";

  constructor(private httpclient: HttpClient) { }

  getOrders(clientId: string): Observable<Order[]> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.get<Order[]>(this.url + `/${clientId}`, { observe: "body", headers: httpheaders });

  }

  getOrder(clientId: string, orderId: string):Observable<Order> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.get<Order>(this.url + `/${clientId}/${orderId}`, { observe: "body", headers: httpheaders });

  }

  postOrder(order: Order): Observable<Order> {
    const payload = {
      ...order,
      buys: order.buys.map((buy) => ({
        ...buy,
        image: {
          ...buy.image,
          data: ''
        }
      })),
    };

    return this.httpclient.post<Order>(this.url, payload);

  }

  //service methods(only for develop)

  putOrder(order: Order): Observable<Order> {

    return this.httpclient.put<Order>(this.url, order);

  }

  deleteOrder(orderId: string): Observable<any> {

    return this.httpclient.delete<any>(this.url + `/${orderId}`);

  }

}
