import { of } from 'rxjs';
import { CartComponent } from './cart.component';
import { ClientService } from '../services/client.service';
import { OrderService } from '../services/order.service';
import { AccountService } from '../services/account.service';
import { ParsingService } from '../services/parsing.service';
import { Buy } from '../models/Buy';
import { Image } from '../models/image';
import { Client } from '../models/client';
import { Order } from '../models/order';
import { OrderStatus } from '../models/enums';

describe('CartComponent', () => {
  const createBuy = (id: string, cost = 10): Buy =>
    new Buy(id, `buy-${id}`, 'desc', cost, 'item;item;coil;1', 'item-id', 1, new Image('img', 'name', 1, 'png', ''));

  it('should submit only selected buys in makeOrder', () => {
    const clientService = new ClientService();
    clientService.addBuy(createBuy('1', 10));
    clientService.addBuy(createBuy('2', 20));

    const postClient = jasmine.createSpy('postClient').and.returnValue(of(new Client('client-id', 'User', 'user@mail.com')));
    const postOrder = jasmine.createSpy('postOrder').and.callFake((order: Order) => of(order));
    const orderService = { postOrder } as unknown as OrderService;
    const accountService = { postClient } as unknown as AccountService;
    const parsingService = { parseItem: (value: string, delimiter: string) => value.split(delimiter) } as ParsingService;

    const component = new CartComponent(clientService, orderService, accountService, parsingService);
    component.ngOnInit();
    component.client.name = 'User';
    component.client.email = 'user@mail.com';
    component.checks.subchecks?.[1] && (component.checks.subchecks[1].set = false);

    component.makeOrder();

    expect(postOrder).toHaveBeenCalled();
    const postedOrder = postOrder.calls.mostRecent().args[0] as Order;
    expect(postedOrder.buys.length).toBe(1);
    expect(postedOrder.buys[0].id).toBe('1');
  });

  it('should sync checkbox list after item removal', () => {
    const clientService = new ClientService();
    clientService.addBuy(createBuy('1', 10));
    clientService.addBuy(createBuy('2', 20));

    const orderService = { postOrder: () => of() } as unknown as OrderService;
    const accountService = { postClient: () => of() } as unknown as AccountService;
    const parsingService = { parseItem: (value: string, delimiter: string) => value.split(delimiter) } as ParsingService;

    const component = new CartComponent(clientService, orderService, accountService, parsingService);
    component.ngOnInit();

    const firstBuy = Array.from(component.buysfororder)[0];
    component.removeFromCart(firstBuy);

    expect(component.checks.subchecks?.length).toBe(component.buysfororder.size);
  });
});
