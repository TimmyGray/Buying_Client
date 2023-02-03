import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from '../models/client';
import { Buy } from '../models/Buy';
import { Order } from '../models/order';
import { OrderStatus } from '../models/enums';
import { Subscription } from 'rxjs';
import { ClientService } from '../services/client.service';
import { ICartBuy } from '../models/cartbuy.interface';
import { OrderService } from '../services/order.service';
import { AccountService } from '../services/account.service';

@Component({
  selector: "app-cart",
  templateUrl: `./htmls/cart.component.html`,
  providers: [OrderService, AccountService]
  
})
export class CartComponent implements OnInit {

  private subscription: Subscription;
  client: Client;
  cost: number = 0;
  buysfororder: Set<Buy>;
  order: Order;

  allset: boolean;
  checks: ICartBuy;

  constructor(
    private readonly clientservice: ClientService,
    private readonly orderservice: OrderService,
    private readonly accservice: AccountService) {
    this.client = new Client("", "", "");
    this.buysfororder = new Set<Buy>();
    this.subscription = new Subscription();
    this.checks = { name: "Set All", set: true, subchecks: new Array<ICartBuy>() };
    this.allset = true;
    this.order = new Order("", this.client, "", new Date(), OrderStatus.under_consideration, new Array<Buy>());
    
  }

  ngOnInit() {

    this.buysfororder = this.clientservice.getListOfBuys();
    this.clientservice.showBuys(Array.from(this.buysfororder));

    this.allCost(true);

    this.buysfororder.forEach(() => {

      this.checks.subchecks?.push({ name: "", set: true, subchecks: new Array<ICartBuy>() })

    })


  }

  ngOnDestroy() {

    this.subscription.unsubscribe();

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
    console.log(set);

    for (var i = 0; i < newbuy.count; i++) {

      this.Cost(newbuy, set);
    }
    
    this.allset = this.checks.subchecks != null && this.checks.subchecks.every((c) => c.set);

  }

  setAll(set: boolean) {
    console.log(set);
    this.allset = set
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

    let parseitem: string[] = item.split(";");
    switch (field) {
      case 0:

        return parseitem[0];

      case 1:

        return parseitem[1];

      case 2:

        return parseitem[2];

      case 3:

        return parseitem[3];

    }

    return undefined;
  }

  async postClient(): Promise<Client | undefined> {

    return await this.accservice.postClient(this.client).toPromise()
      .then(data => {

      console.log(data);
      return data as Client;

      })
      .catch(e => {

      console.log(e);
      return undefined;

    });

  }

  async postOrder(): Promise<Order | undefined> {

    return await this.orderservice.postOrder(this.order).toPromise()
      .then(data => {

        console.log(data);
        return data as Order;

      })
      .catch(e => {

        console.log(e);
        return undefined;

      });

  }

  async makeOrder() {

    if (this.client.name != "" && this.client.email!="") {

      if (this.buysfororder.size != 0) {

        var newclient = await this.postClient();
        console.log(newclient);

        if (newclient != undefined) {

          this.order.client = newclient;
          this.order.buys = Array.from(this.buysfororder);

          var order = await this.postOrder();

          if (order != undefined) {

            console.log("Заказ создан, подробности придут на указанный email");
            alert("Заказ создан, подробности придут на указанный email");

            this.clientservice.initBuys();
            this.clientservice.getListOfBuys();
            this.allCost(false);

          }


        }

      }
      else {

        console.log("У вас нет покупок");
        alert("У вас нет покупок");


      }

    }
    else {

        console.log("Заполните поля клиента");
        alert("Заполните поля клиента");

    }

  }
   
}
