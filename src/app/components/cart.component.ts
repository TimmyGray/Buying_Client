import { Component, OnInit, OnDestroy } from '@angular/core';
import { Client } from '../models/client';
import { Buy } from '../models/Buy';
import { Order } from '../models/order';
import { OrderStatus } from '../models/enums';
import { Observable, Subscription,of } from 'rxjs';
import { map, switchMap, exhaustMap } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { ICartBuy } from '../models/cartbuy.interface';
import { OrderService } from '../services/order.service';
import { AccountService } from '../services/account.service';
import { ParsingService } from '../services/parsing.service';
import { ClientsIndentityService } from '../services/clients_indentity.service';
import { FormControl, Form, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-cart",
  templateUrl: `./htmls/cart.component.html`,
  providers: [OrderService, AccountService]
  
})
export class CartComponent implements OnInit {

  loginForm!: FormGroup;
  client: Client;
  cost: number = 0;
  buysfororder: Set<Buy>;
  order: Order;

  allset: boolean;
  checks: ICartBuy;
  isAuthorized: boolean = false;
  hide: boolean = true;

  logInfo: any = {
    login: '',
    password:''
  }

  constructor(
    private readonly cartservice: CartService,
    private readonly orderservice: OrderService,
    private readonly accountservice: AccountService,
    private readonly parsingservice: ParsingService,
    private readonly clientservice: ClientsIndentityService) {
    this.client = new Client("", "", "","");
    this.buysfororder = new Set<Buy>();
    //this.subscription = new Subscription();
    this.checks = { name: "Set All", set: true, subchecks: new Array<ICartBuy>() };
    this.allset = true;
    this.order = new Order("", this.client, "", new Date(), OrderStatus.under_consideration, new Array<Buy>());
    this.isAuthorized = this.clientservice.checkAuthorize();
  }

  ngOnInit() {

    this.buysfororder = this.cartservice.getListOfBuys();
    this.cartservice.showBuys(Array.from(this.buysfororder));

    this.allCost(true);

    this.buysfororder.forEach(() => {

      this.checks.subchecks?.push({ name: "", set: true, subchecks: new Array<ICartBuy>() })

    });

    this.clientservice.isAuthorized$.subscribe({
      next: (auth: boolean) => {
        this.isAuthorized = auth;
      }
    });

    this.loginForm = new FormGroup({
      emailOrLogin: new FormControl(this.logInfo.emailOrLogin, [Validators.required]),
      password: new FormControl(this.logInfo.password, [Validators.required])
    });

  }

  ngOnDestroy() {

    //this.subscription.unsubscribe();

  }


  addOne(buy: Buy) {
    let newbuy: Buy = Object.assign({}, buy);

    this.cartservice.addBuy(newbuy);

    this.Cost(buy, true);

  }

  removeOne(buy: Buy) {

    let newbuy: Buy = Object.assign({}, buy);

    this.cartservice.removeBuy(newbuy, false);

    this.Cost(buy, false);

  }

  removeFromCart(buy: Buy) {

    for (var i = 0; i < buy.count; i++) {

      this.Cost(buy, false);

    }

    this.cartservice.removeBuy(buy, true);

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

  get loginInfo() {
    return {
      emailOrLogin: this.loginForm.get('emailOrLogin'),
      password: this.loginForm.get('password')
    }

  }

  loginClient() {

    of(this.logInfo).pipe(
      map(logform => {
        logform.emailOrLogin = this.loginInfo.emailOrLogin?.value;
        logform.password = this.loginInfo.password?.value;
      }),
      exhaustMap(() => this.accountservice.login(this.logInfo))
    ).subscribe({
      next: (jwttoken: any) => {

        this.clientservice.login(jwttoken);
        console.log('Successful login');

      },
      error: (logerror: any) => {

        alert(logerror.error);
        console.log(logerror);

      }
    });

  }

  makeOrder() {

    //if (this.client.name != "" && this.client.email!="") {

    //  if (this.buysfororder.size != 0) {

    //    this.accservice.postClient(this.client).pipe(

    //      map(client => {

    //        this.order.client = client;
    //        this.order.buys = Array.from(this.buysfororder);
    //        this.order.buys.forEach(b => {

    //          b.image.data = "";

    //        })
    //        return this.order;

    //      }),

    //      exhaustMap(order => this.orderservice.postOrder(order))

    //    ).subscribe({
    //      next: (order => {

    //        console.log(order);
    //        console.log("Заказ создан, подробности придут на указанный email");
    //        alert("Заказ создан, подробности придут на указанный email");

    //        this.clientservice.initBuys();
    //        this.buysfororder = new Set();
    //        this.clientservice.getListOfBuys();
    //        this.allCost(false);


    //      }),
    //      error: (error => {

    //        console.error(error);
    //        alert("Что-то пошло не так=(((Заказ создан не был");

    //      })

    //    });

    //  }
    //  else {

    //    console.log("У вас нет покупок");
    //    alert("У вас нет покупок");

    //  }

    //}
    //else {

    //    console.log("Заполните поля клиента");
    //    alert("Заполните поля клиента");

    //}

  }
   
}
