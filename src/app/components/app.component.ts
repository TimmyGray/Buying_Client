import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, Renderer2, OnInit, ViewChild, ElementRef,AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Route, ParamMap, Params } from '@angular/router';
import { CheckPageDirective } from '../directives/check-page.directive';
import { BuyService } from '../services/buy.service';
import { Buy } from '../models/Buy';
import { CartService } from '../services/cart.service';
import { AccountService } from '../services/account.service';
import { ClientsIndentityService } from '../services/clients_indentity.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './htmls/app.component.html',
  styleUrls: ['../styles/app.component.css'],
  providers: [BuyService, AccountService]
})
export class AppComponent implements OnInit {

  dtb: any;
  url:any;
  count: number = 0;
  cost: number = 0;
  isAuthorized: boolean = false;
  body: HTMLElement;

  private getCount(count: number) {

    this.count = count;

  }

  private getCost(cost: number) {

    this.cost = cost;

  }

  private checkAuthorized(isAuthorized: boolean) {

    this.isAuthorized = isAuthorized;

  }

  ngOnInit() {

    window.addEventListener('scroll', this.scrolling, true);
    this.cartserv.count$.subscribe((c: number) => this.getCount(c));
    this.cartserv.price$.subscribe((p: number) => this.getCost(p));
    this.clientserv.isAuthorized$.subscribe({
      next: (auth: boolean) => {

        this.checkAuthorized(auth);
      }
    });
  
  }
  constructor(
    private readonly cartserv: CartService,
    private readonly accserv: AccountService,
    private readonly clientserv: ClientsIndentityService,
    private readonly route: ActivatedRoute) {
    this.dtb = document.getElementById("dtb");
    this.body = document.body;
    this.checkAuthorized(this.clientserv.checkAuthorize());
  }  

  logout() {

    this.clientserv.logout();

  }

  scrolling(e: any) {

    
    let sc = e.target.scrollingElement.scrollTop;
    let sh = e.target.scrollingElement.scrollHeight;
    let ch = e.target.scrollingElement.clientHeight;
    let endofpage = Math.abs(sh - ch - sc);
    //console.log(`window scrolltop:${sc}`);
    //console.log(`window scrollheight:${sh}`);
    //console.log(`window clientheight:${ch}`);
    //console.log(`toolbar clientheight:${(this.dtb as Element).clientHeight}`);
    //console.log(`end_of_page:${endofpage}`);

    if (sc == endofpage && sc == 0) {
      

    }
    else {

      if ((this.dtb as Element).classList.contains("fixedbot")) {

       (this.dtb as Element).classList.remove('fixedbot');

      }

    }

  }
}

