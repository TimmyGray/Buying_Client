import { Injectable } from '@angular/core';
import { count, Subject } from 'rxjs';
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
    console.log(`root`);
  }

  private changeBuy(buy: Buy, num: number, price: number) {

    this.count.next(num);

    this.price.next(price);

    this.changebuy.next(buy);

    console.log(`after change ${buy}\n${num}\n${price}`);
  }

  public addBuy(buy: Buy) {


    this.curcount ++;

    this.curprice += buy.cost;

    if (this.listofbuys.size == 0) {

      this.listofbuys.add(buy);

    }
    else {

      let has: boolean = false;

      this.listofbuys.forEach(sb => {

        if (sb._id == buy._id) {

          has = true;
          sb.count++;

        }

      });

      if (!has) {

        this.listofbuys.add(buy);

      }

    }

    this.listofbuys.forEach(sb => {

      console.log(`listofbuys:${sb._id}\n${sb.name}\n${sb.count}`);

    })
   
    console.log(this.curcount);
    console.log(this.curprice);

    this.changeBuy(buy, this.curcount, this.curprice);


  }

  public removeBuy(buy: Buy, deleteall: boolean) {

    if (this.curcount > 0) {
      console.log(`curcount before remove ${this.curcount}`);
      if (deleteall) {

        while (buy.count!=0) {

          console.log(`buy count:${buy.count}`);
          this.removeBuy(buy, false);
        }

      }
      else {

        this.listofbuys.forEach(sb => {
         
          if (sb._id == buy._id) {

            if (sb.count != 0) {

              sb.count--;

              if (sb.count == 0) {

                this.listofbuys.delete(sb);

              }

              this.curcount--;

              this.curprice -= buy.cost;

              console.log(`current count - ${this.curcount}`);
              console.log(`current price - ${this.curprice}`);

            }
            
          }
        });

        this.changeBuy(buy, this.curcount, this.curprice);

      }
    }
  }

  getBuy(): void {

  }

  getListOfBuys(): Set<Buy> {

    return this.listofbuys;

  }

  initBuys() {

    this.listofbuys = new Set<Buy>();
    this.curcount = 0;
    this.curprice = 0;
    this.count.next(0);
    this.price.next(0);

  }

  showBuys(list: Buy[]) {
    console.log("Show Method");
    list.forEach(b => {

      console.log(`show:${b.name}\n${b.item}\n${b.description}\n${b.count}\n${b.cost}`);

    });

  }

}

