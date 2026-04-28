import { Component, OnInit } from '@angular/core';
import { Client } from '../models/client';
import { Buy } from '../models/Buy';
import { Order } from '../models/order';
import { OrderStatus } from '../models/enums';
import { map, exhaustMap } from 'rxjs/operators';
import { ClientService } from '../services/client.service';
import { ICartBuy } from '../models/cartbuy.interface';
import { OrderService } from '../services/order.service';
import { AccountService } from '../services/account.service';
import { ParsingService } from '../services/parsing.service';

@Component({
    selector: "app-cart",
    templateUrl: `./htmls/cart.component.html`,
    providers: [OrderService, AccountService],
    standalone: false
})
export class CartComponent implements OnInit {

  //private subscription: Subscription;
  client: Client;
  cost: number = 0;
  buysfororder: Set<Buy>;
  order: Order;

  allset: boolean;
  checks: ICartBuy;
  statusMessage: string = '';

  constructor(
    private readonly clientservice: ClientService,
    private readonly orderservice: OrderService,
    private readonly accservice: AccountService,
    private readonly parsingservice: ParsingService) {
    this.client = new Client("", "", "");
    this.buysfororder = new Set<Buy>();
    //this.subscription = new Subscription();
    this.checks = { name: "Set All", set: true, subchecks: new Array<ICartBuy>() };
    this.allset = true;
    this.order = new Order("", this.client, "", new Date(), OrderStatus.UnderConsideration, new Array<Buy>());
    
  }

  ngOnInit() {

    this.buysfororder = this.clientservice.getListOfBuys();
    this.allCost(true);

    this.buysfororder.forEach((buy) => {

      this.checks.subchecks?.push({ name: buy.id, set: true, subchecks: new Array<ICartBuy>() });

    });


  }

  ngOnDestroy() {

    //this.subscription.unsubscribe();

  }


  addOne(buy: Buy) {
    let newbuy: Buy = Object.assign({}, buy);

    this.clientservice.addBuy(newbuy);

    this.Cost(buy, true);

  }

  removeOne(buy: Buy) {

    let newbuy: Buy = Object.assign({}, buy);

    this.clientservice.removeBuy(newbuy, false);

    this.Cost(buy, false);

  }

  removeFromCart(buy: Buy) {

    for (var i = 0; i < buy.count; i++) {

      this.Cost(buy, false);

    }

    this.clientservice.removeBuy(buy, true);
    this.syncChecks();

  }


  Cost(buy: Buy, checked: boolean) {

    if (checked) {

      this.cost = this.cost + buy.cost;

    }
    else {

      this.cost = this.cost - buy.cost;

    }

  }

  allCost(checked: boolean) {

    if (checked) {
      this.buysfororder.forEach(b => {

        for (var i = 0; i < b.count; i++) {

          this.Cost(b, true);

        }

      });
    }
    else {

      this.cost = 0;

    }


  }


  someSet(): boolean {
    if (this.checks.subchecks == null) {
      return false;
    }
    else {
      return (this.checks.subchecks.filter((c) => c.set).length > 0 && !this.allset);

    }

  }

  updateAll(newbuy: Buy, set: boolean) {
    for (var i = 0; i < newbuy.count; i++) {

      this.Cost(newbuy, set);
    }
    
    this.allset = this.checks.subchecks != null && this.checks.subchecks.every((c) => c.set);

  }

  setAll(set: boolean) {
    this.allset = set;
    this.allCost(set);

    if (this.checks.subchecks!=null) {

      this.checks.subchecks.forEach(c => {

        c.set = set;

      })

    }

  }

  setBuy(newbuy: Buy, curset: ICartBuy) {

    if (curset.set) {

      curset.set = !curset.set;
      this.updateAll(newbuy, curset.set);
      this.someSet();

    }
    else {

      curset.set = true;
      this.updateAll(newbuy, curset.set);
      this.someSet();

    }

  }

  parsingItem(item: string, field: number): string | undefined {

    switch (field) {
      case 0:

        return this.parsingservice.parseItem(item,";")[0];

      case 1:

        return this.parsingservice.parseItem(item,";")[1];

      case 2:

        return this.parsingservice.parseItem(item, ";")[2];

      case 3:

        return this.parsingservice.parseItem(item, ";")[3];

    }

    return undefined;
  }

  makeOrder() {
    this.statusMessage = '';
    const selectedBuys = this.getSelectedBuys();

    if (this.client.name !== '' && this.client.email !== '') {

      if (selectedBuys.length !== 0) {

        this.accservice.postClient(this.client).pipe(

          map(client => {
            return {
              ...this.order,
              client,
              buys: selectedBuys,
            };

          }),

          exhaustMap(order => this.orderservice.postOrder(order))

        ).subscribe({
          next: (() => {
            this.statusMessage = 'Заказ создан, подробности придут на указанный email';

            this.clientservice.initBuys();
            this.buysfororder = new Set();
            this.clientservice.getListOfBuys();
            this.allCost(false);
            this.checks.subchecks = [];


          }),
          error: ((_error) => {
            this.statusMessage = 'Что-то пошло не так. Заказ создан не был.';

          })

        });

      }
      else {

        this.statusMessage = 'У вас нет выбранных покупок.';

      }

    }
    else {

        this.statusMessage = 'Заполните поля клиента.';

    }

  }

  private getSelectedBuys(): Buy[] {
    const selectedById = new Map((this.checks.subchecks ?? []).map((check) => [check.name, check.set]));
    return Array.from(this.buysfororder).filter((buy) => selectedById.get(buy.id) ?? true);
  }

  private syncChecks(): void {
    const existingById = new Map((this.checks.subchecks ?? []).map((check) => [check.name, check.set]));
    this.checks.subchecks = Array.from(this.buysfororder).map((buy) => ({
      name: buy.id,
      set: existingById.get(buy.id) ?? true,
      subchecks: [],
    }));
    this.allset = this.checks.subchecks.every((check) => check.set);
  }
   
}
