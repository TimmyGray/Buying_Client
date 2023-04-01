import { Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-creating',
  templateUrl: `./htmls/creating.component.html`,
  providers: [ConnetorService, PriceService, CoilService]
})
export class CreatingComponent implements OnInit {
  newBuy: Buy;
  wire: Wire;

  wiretype: string = "";
  firstcontype: string = "";
  secondcontype: string = "";

  cost: number = 0;
  firstconprice: number = 0;
  secondconprice: number = 0;
  coilprice: number = 0;
  allgood: boolean = true;

  connectors: string[];
  prices: Price[];
  coils: string[];

  constructor(
    private readonly connectorserv: ConnetorService,
    private readonly priceserv: PriceService,
    private readonly coilserv: CoilService,
    private readonly clientserv: ClientService) {

    this.newBuy = this.initBuy();
    this.wire = this.initWire();
    this.connectors = new Array<string>();
    this.prices = new Array<Price>();
    this.coils = new Array<string>();
    
  }

  ngOnInit() {

    this.getConnectors();
    this.getPrices();
    this.getCoils();

  }

  clearAll() {

    this.newBuy = this.initBuy();
    this.wire = this.initWire();
    this.wiretype = "";
    this.firstcontype = "";
    this.secondcontype = "";

    this.cost = 0;
    this.firstconprice = 0;
    this.secondconprice = 0;
    this.coilprice = 0;

  }

  initBuy():Buy {

    return new Buy("", "", "", 0, "", 1, new Image("", "", 0, "",""));

  }

  initWire() {

    return new Wire("", "", 0, "", "", "");

  }


  getConnectors() {

    this.connectorserv.getConnectors().subscribe({
      next: ((value: string[]) => {

        console.log(value);
        this.connectors = value;

      }),
      error: ((e) => {

        console.error(e);

      })

    });

  }

  getPrices() {

    this.priceserv.getPrices().subscribe({
      next: ((value: Price[]) => {

        console.log(value);
        this.prices = value;

      }),

      error: (e => {

        console.error(e);

      })
      
    });

  }

  getCoils() {

    this.coilserv.getCoils().subscribe({
      next: ((value: string[]) => {

        console.log(value);
        this.coils = value;

      }),

      error: ((e) => {

        console.error(e);

      })


    });

  }

  findPrice(item:string):number {

    let splititem: string[] = item.split(",");
    let cost: number = 0;

    this.prices.forEach(p => {
      console.log(`price : ${p.itemofprice.name},${p.itemofprice.type}-${splititem[0]},${splititem[1]}`);
      if (p.itemofprice.name == splititem[0] && p.itemofprice.type == splititem[1]) {

        console.log(p.cost);
        cost = p.cost;
        
      }

    });

    return cost;
  }

  allCost() {

    console.log(`first:${this.firstconprice}\nsecond:${this.secondconprice}\ncoil:${this.coilprice}\nlength:${this.wire.length}`)
    let allcost: number = this.firstconprice + this.secondconprice + (this.wire.length * this.coilprice);
    console.log(allcost);
    this.cost = allcost;
    this.checkAllgood();

  }

  selectType(type: number) {

    switch (type) {

      case 0: {

        this.wire.firstcon = this.firstcontype.replace("-", ",");
        this.firstconprice = this.findPrice(this.wire.firstcon);
        console.log(this.firstconprice);

        break;
      }

      case 1: {

        this.wire.secondcon = this.secondcontype.replace("-", ",");
        this.secondconprice = this.findPrice(this.wire.secondcon);
        console.log(this.secondconprice);

        break;

      }

      case 2: {

        this.wire.type = this.wiretype.replace("-", ",");
        this.coilprice = this.findPrice(this.wire.type);
        console.log(this.coilprice);

        break;
      }
       
    }

    this.allCost();
        
  }

  addToCart() {

    this.newBuy.cost = this.cost;
    this.newBuy.item = `${this.wire.firstcon};${this.wire.secondcon};${this.wire.type};${this.wire.length}`;

    let buy: Buy = Object.assign({}, this.newBuy);

    console.log(buy);
    this.clientserv.addBuy(buy);

  }

  checkAllgood() {

    if (this.firstconprice != 0 && this.secondconprice != 0 && this.coilprice != 0 && this.wire.length != 0) {

      this.allgood = false;

    }
    else {

      this.allgood = true;

    }

  }

}
