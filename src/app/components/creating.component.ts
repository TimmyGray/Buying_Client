import { Component, OnInit,ViewChild,AfterViewInit, OnDestroy } from '@angular/core';
import { Buy } from '../models/Buy';
import { CoreNumber } from '../models/enums';
import { Price } from '../models/price';
import { Wire } from '../models/wire';
import { ConnetorService } from '../services/connector.service';
import { PriceService } from '../services/price.service';
import { Connector } from '../models/connector';
import { CoilService } from '../services/coil.service';
import { Iitem } from '../models/item.interface';
import { ClientService } from '../services/client.service';
import { Image } from '../models/image';
import { Coil } from '../models/coil';
import { Subject, Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';


@Component({
    selector: 'app-creating',
    templateUrl: `./htmls/creating.component.html`,
    providers: [ConnetorService, PriceService, CoilService],
    standalone: false
})
export class CreatingComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("addToCart", { static: false })
  addtocartbut: MatButton | undefined;

  private fullprice: Subject<number> = new Subject<number>();
  fullprice$ = this.fullprice.asObservable();
  addtocart$: Subscription | undefined;

  newBuy: Buy;
  wire: Wire;

  wirecoil: Coil;

  cost: number = 0;
  firstconnprice: number[];
  sumfirstprice: number = 0;
  sumsecondprice: number = 0;
  secondconnprice: number[];
  coilprice: number = 0;
  curnumber: number = 0;
  allgood: boolean = true;
  addbut: HTMLElement|null;
  statusMessage: string = '';

  connectors: Connector[];
  firstsideconn: Connector[];
  secondsideconn: Connector[];
  prices: Price[];
  coils: Coil[];

  constructor(
    private readonly connectorserv: ConnetorService,
    private readonly priceserv: PriceService,
    private readonly coilserv: CoilService,
    private readonly clientserv: ClientService) {

    this.newBuy = this.initBuy();
    this.wire = this.initWire();
    this.connectors = new Array<Connector>();
    this.prices = new Array<Price>();
    this.coils = new Array<Coil>();
    this.firstsideconn = new Array();
    this.secondsideconn = new Array();
    this.firstconnprice = new Array();
    this.secondconnprice = new Array();
    this.wirecoil = this.initCoil();
    this.addbut = document.getElementById("addbut");
  }

  ngOnInit() {

    this.getConnectors();
    this.getPrices();
    this.getCoils();
    this.fullprice$.subscribe({ next: (price) => { this.cost = price; } })
    
    
  }

  ngAfterViewInit() {

    

    //this.addtocart$ = fromEvent(this.addbut as HTMLElement, 'click').pipe(

    //  map(() => {
    //    if (this.newBuy.name == "") {
    //      alert("You must fill name field");
    //      return false;
    //    }
    //    return true;
    //  }),
    //  filter(value => value == true),
    //  map(() => {

    //    this.newBuy.item = this.makeItemBuy(this.wire, this.wirecoil);
    //    this.newBuy.cost = this.cost;

    //  }),
      

    //).subscribe({
    //  next: (() => {

    //    this.clientserv.addBuy(this.newBuy);
    //    this.clearAll();

    //  }),

    //  error: (e => {

    //    console.error(e);

    //  })
      
    //});

  }

  ngOnDestroy() {

    this.addtocart$?.unsubscribe();
    this.fullprice.complete();

  }

  clearAll() {

    this.newBuy = this.initBuy();
    this.wire = this.initWire();
    this.wirecoil = this.initCoil();

    this.cost = 0;
    this.firstconnprice = new Array();
    this.secondconnprice = new Array();
    this.coilprice = 0;

  }

  private initBuy():Buy {

    return new Buy("", "", "", 0, "","", 1, new Image("", "", 0, "",""));

  }

  private initWire(): Wire {

    return new Wire("", "", 0, "", new Array(), new Array(), 0);

  }

  private initConnector(): Connector {

    return new Connector("", "", "", 0);

  }

  private initCoil(): Coil {

    return new Coil("", "", "", 0);

  }


  getConnectors() {

    this.connectorserv.getConnectors().subscribe({
      next: ((connectors) => {
        this.connectors = connectors;

      }),
      error: ((e) => {

        console.error(e);

      })

    });

  }

  getPrices() {

    this.priceserv.getPrices().subscribe({
      next: ((prices) => {
        this.prices = prices;

      }),

      error: (e => {

        console.error(e);

      })
      
    });

  }

  getCoils() {

    this.coilserv.getCoils().subscribe({
      next: ((coils) => {
        this.coils = coils;

      }),

      error: ((e) => {

        console.error(e);

      })


    });

  }

  //private get addToCartBut(): HTMLElement {

  //  return this.addtocartbut?.nativeElement;

  //}

  findPrice(item: Iitem): number {

    let price = this.prices.find(p => p.itemOfPrice.id == item.id)?.cost;

    if (price) {

      return price;

    }

    return 0;
   
  }


  checkAllgood():boolean {
    this.statusMessage = '';

    if (this.wire.numberofconnectors <= 0) {
      this.statusMessage = 'Количество коннекторов должно быть больше 0.';
      return true;
    }

    for (let conn of this.wire.firstconn) {

      if (conn.id == "") {
        this.statusMessage = 'Выберите все коннекторы первой стороны.';
        return true;
      }

    }

    for (let conn of this.wire.secondconn) {

      if (conn.id == "") {
        this.statusMessage = 'Выберите все коннекторы второй стороны.';
        return true;
      }

    }

    return false;
   

  }

  changeNumberOfConn() {

    if (this.wire.numberofconnectors>=0) {

      let temp: number = this.curnumber;
      if (this.curnumber < this.wire.numberofconnectors) {

        while (temp < this.wire.numberofconnectors) {

          this.wire.firstconn.push(this.initConnector());
          this.wire.secondconn.push(this.initConnector());

          temp++;
        }

      }
      if (this.curnumber > this.wire.numberofconnectors) {

        while (temp > this.wire.numberofconnectors) {

          this.wire.firstconn.pop();
          this.wire.secondconn.pop();
          this.firstconnprice.pop();
          this.secondconnprice.pop();
          temp--;

        }

      }

      this.curnumber = this.wire.numberofconnectors;
      this.allgood = this.checkAllgood();


    }
    //else {
    //  this.wire.numberofconnectors = 0;
    //}

  }

  changeConnector( i: number, isFirstSide: boolean) {

    if (isFirstSide) {

      let conn = Object.assign({}, this.firstsideconn[i]);
      this.wire.firstconn[i] = conn as unknown as Connector;

      this.firstconnprice[i] = this.findPrice(conn);

      this.sumfirstprice = this.calcConnSum(this.firstconnprice);

    }
    else {

      let conn = Object.assign({}, this.secondsideconn[i]);
      this.wire.secondconn[i] = conn as unknown as Connector;

      this.secondconnprice[i] = this.findPrice(conn);

      this.sumsecondprice = this.calcConnSum(this.secondconnprice);

    }

    this.changePrice();

  }

  calcConnSum(prices: number[]): number {

    let sum: number = 0;

    for (let price of prices) {

      sum += price;
    }

    return sum;
  }

  changeCoil() {

    this.coilprice = this.findPrice(this.wirecoil) * this.wire.length;
    if (this.wirecoil.id == '' || this.wire.length <= 0) {
      this.allgood = true;
    }
    this.changePrice();

  }
 

  changePrice() {

    let price = 0;
    if (this.sumfirstprice != 0 && this.sumsecondprice != 0 && this.coilprice != 0) {

      this.allgood = this.checkAllgood();

      if (!this.allgood) {
        price = this.sumfirstprice + this.sumsecondprice + this.coilprice;
        this.fullprice.next(price);

      }

    }

    this.fullprice.next(price);

  }

  private makeItemBuy(wire: Wire, coil: Coil): string {

    let item: string;

    let array1: string[] = new Array<string>();
    let array2: string[] = new Array<string>();
    wire.firstconn.forEach(con => {

      array1.push(`${con.name}-${con.type}`);

    });
    wire.secondconn.forEach(con => {

      array2.push(`${con.name}-${con.type}`);

    });

    item = array1.toString() + ";" + array2.toString() + ";" + `${coil.name}-${coil.type};` + `${wire.length}`;

    return item;

  }

  addToCart(_event: Event) {
    this.statusMessage = '';

    if (this.newBuy.name == "") {
      this.statusMessage = 'Заполните название.';
      return;
    }

    this.newBuy.item = this.makeItemBuy(this.wire, this.wirecoil);
    this.newBuy.cost = this.cost;

    this.clientserv.addBuy(this.newBuy);

    this.clearAll();
    this.allgood = this.checkAllgood();
  

  }

}
