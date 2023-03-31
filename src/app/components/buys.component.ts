import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Buy } from '../models/Buy';
import { FullDescriptionComponent } from '../components/fulldescription.component';
import { config, from, map, Subscription, switchMap, of, take, Observable, delay, exhaustMap, switchAll, exhaust, concatMap } from 'rxjs';
import { BuyService } from '../services/buy.service';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-buys',
  templateUrl: `./htmls/buys.component.html`,
  providers: [BuyService]
})
export class BuysComponent implements OnInit {

  listofbuys: Buy[];
  listofimages: string[];
  displaybut: string = "none";
  parseitem: string[];

  constructor(
    public dialog: MatDialog,
    private readonly buyservice: BuyService,
    private readonly clientservice: ClientService) {

    this.listofbuys = new Array<Buy>();
    this.parseitem = new Array<string>();
    this.listofimages = new Array<string>();
  }

  ngOnInit() {

    this.getBuys();
    //this.buyservice.getImage("6420243eca7c4d8337228b9f", "jpeg").subscribe({
    //  next: ((value) => {

    //    console.log(value);
    //    console.log("fsdfsdf");

    //  }),

    //  error: (e => {

    //    console.error(e);

    //  })
      
      
    //});

  }

  private getBuys() {

    this.buyservice.getBuys().pipe(
      map(value => {
        this.listofbuys = value;
        return this.listofbuys;
      }),

      switchMap(value => from(value)),
      concatMap(value => this.buyservice.getImage(value.image._id, value.image.type))
    
      

    ).subscribe({
      next: ((value) => {

        this.showBuyImage(value);
       
      })

    })

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

  showBuyImage(image:Blob){

    let imagereader = new FileReader();
    imagereader.readAsDataURL(image);

    imagereader.onload = (() => {

      this.listofimages.push(imagereader.result as string);
    });
    imagereader.onerror = (e => {
      console.error(e);

    });
    //let image: File = new File(buy.image.data, buy.image.name);

    
  }

}
