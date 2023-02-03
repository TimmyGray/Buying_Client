import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Buy } from '../models/Buy';
import { FullDescriptionComponent } from '../components/fulldescription.component';
import { config, Subscription } from 'rxjs';
import { BuyService } from '../services/buy.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-buys',
  templateUrl: `./htmls/buys.component.html`,
  providers: [BuyService]
})
export class BuysComponent implements OnInit {

  listofbuys: Buy[];
  displaybut: string = "none";
  parseitem: string[];

  constructor(
    public dialog: MatDialog,
    private readonly buyservice: BuyService,
    private readonly clientservice: ClientService) {

    this.listofbuys = new Array<Buy>();
    this.parseitem = new Array<string>();
  }

  ngOnInit() {

    this.getBuys();

  }

  private getBuys() {

    this.buyservice.getBuys().subscribe((data: Buy[]) => {

      this.listofbuys = data;

    },
      (e) => {

        console.log(e);

      });

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

  addToCart(buy: Buy): void {

    let buytocart: Buy = Object.assign({}, buy);
    console.log(`buy to add - ${buytocart._id}, count - ${buytocart.count}`);

    this.clientservice.addBuy(buytocart);
    
    
  }

  removeFromCart(buy: Buy): void {

    let removefromcart: Buy = Object.assign({}, buy);
    console.log(`buy to remove - ${removefromcart._id}`);

    this.clientservice.removeBuy(removefromcart, false);

  }

  openFullDes(buy: Buy) {

    let configure: MatDialogConfig = new MatDialogConfig();
    configure.data = buy;
    let dialogRef = this.dialog.open(FullDescriptionComponent, configure);

  }

}
