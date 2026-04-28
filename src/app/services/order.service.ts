import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { environment } from '../../environments/environment';


@Injectable()
export class OrderService {

  url: string = environment.apiUrl+"/orders";

  constructor(private httpclient: HttpClient) { }

  /** Gets all orders for a specific client id. */
  getOrders(clientId: string): Observable<Order[]> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.get<Order[]>(this.url + `/${clientId}`, { observe: "body", headers: httpheaders });

  }

  /** Gets one order by client id and order id. */
  getOrder(clientId: string, orderId: string):Observable<Order> {

    const httpheaders: HttpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
    return this.httpclient.get<Order>(this.url + `/${clientId}/${orderId}`, { observe: "body", headers: httpheaders });

  }

  /** Creates a new order and strips image data payload from order lines before sending. */
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

  /** Updates an existing order in the backend. */
  putOrder(order: Order): Observable<Order> {

    return this.httpclient.put<Order>(this.url, order);

  }

  /** Deletes an order by its id. */
  deleteOrder(orderId: string): Observable<any> {

    return this.httpclient.delete<any>(this.url + `/${orderId}`);

  }

}
