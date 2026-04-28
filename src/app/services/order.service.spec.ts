import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { OrderService } from './order.service';
import { environment } from '../../environments/environment';
import { Client } from '../models/client';
import { Order } from '../models/order';
import { OrderStatus } from '../models/enums';
import { Buy } from '../models/Buy';
import { Image } from '../models/image';

describe('OrderService', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post order and sanitize image data', () => {
    const buy = new Buy('b1', 'name', 'd', 12, 'i', 'item', 1, new Image('img', 'n', 1, 'png', 'raw-data'));
    const order = new Order('o1', new Client('c1', 'name', 'a@b.com'), '', new Date(), OrderStatus.UnderConsideration, [buy]);

    service.postOrder(order).subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/orders`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.buys[0].image.data).toBe('');
  });
});
