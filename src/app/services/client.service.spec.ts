import { TestBed } from '@angular/core/testing';
import { Buy } from '../models/Buy';
import { Image } from '../models/image';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientService);
  });

  const createBuy = (id: string, cost = 10): Buy =>
    new Buy(id, `buy-${id}`, 'desc', cost, 'item', 'item-id', 1, new Image('img', 'name', 1, 'png', ''));

  it('should add buy and increase counters', () => {
    service.addBuy(createBuy('1', 15));

    expect(service.getListOfBuys().size).toBe(1);
  });

  it('should aggregate duplicate buys by id', () => {
    service.addBuy(createBuy('1', 15));
    service.addBuy(createBuy('1', 15));

    const first = Array.from(service.getListOfBuys())[0];
    expect(first.count).toBe(2);
  });

  it('should remove all counts when deleteAll=true', () => {
    const buy = createBuy('1', 15);
    service.addBuy(buy);
    service.addBuy(createBuy('1', 15));

    service.removeBuy(buy, true);

    expect(service.getListOfBuys().size).toBe(0);
  });
});
