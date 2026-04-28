import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Buy } from '../models/Buy';


@Injectable({
  providedIn: 'root'

})
export class ClientService {

  private listofbuys: Set<Buy>;
  private curcount: number;
  private curprice: number;

  private changebuy = new Subject<Buy>();
  private count = new Subject<number>();
  private price = new Subject<number>();

  public count$ = this.count.asObservable();
  public price$ = this.price.asObservable();
  public changebuy$ = this.changebuy.asObservable();

  constructor() {
    this.listofbuys = new Set<Buy>();
    this.curcount = 0;
    this.curprice = 0;
  }

  /** Emits cart counters and the latest changed buy to subscribed UI components. */
  private changeBuy(buy: Buy, num: number, price: number) {

    this.count.next(num);

    this.price.next(price);

    this.changebuy.next(buy);
  }

  private findBuyById(id: string): Buy | undefined {
    return Array.from(this.listofbuys).find((buy) => buy.id === id);
  }

  /** Adds a buy to the cart, merging quantity when an item with the same id already exists. */
  public addBuy(buy: Buy) {
    this.curcount++;
    this.curprice += buy.cost;
    const current = this.findBuyById(buy.id);

    if (current) {
      current.count++;
    } else {
      this.listofbuys.add(buy);
    }

    this.changeBuy(buy, this.curcount, this.curprice);
  }

  /** Removes one or all instances of a buy from the cart and recalculates aggregate totals. */
  public removeBuy(buy: Buy, deleteall: boolean) {
    if (this.curcount <= 0) {
      return;
    }

    const current = this.findBuyById(buy.id);
    if (!current) {
      return;
    }

    if (deleteall) {
      this.curcount -= current.count;
      this.curprice -= current.cost * current.count;
      this.listofbuys.delete(current);
    } else if (current.count > 0) {
      current.count--;
      this.curcount--;
      this.curprice -= current.cost;

      if (current.count === 0) {
        this.listofbuys.delete(current);
      }
    }

    this.curcount = Math.max(0, this.curcount);
    this.curprice = Math.max(0, this.curprice);
    this.changeBuy(current, this.curcount, this.curprice);
  }

  getBuy(): void {

  }

  /** Returns the in-memory cart state used by UI components. */
  getListOfBuys(): Set<Buy> {

    return this.listofbuys;

  }

  /** Clears cart state and resets public counter streams to zero. */
  initBuys() {

    this.listofbuys = new Set<Buy>();
    this.curcount = 0;
    this.curprice = 0;
    this.count.next(0);
    this.price.next(0);

  }

  showBuys(list: Buy[]) {
    void list;
  }

}
