import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, Renderer2, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CheckPageDirective } from '../directives/check-page.directive';
import { BuyService } from '../services/buy.service';
import { Buy } from '../models/Buy';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './htmls/app.component.html',
  styleUrls: ['../styles/app.component.css'],
  providers: [BuyService]
})
export class AppComponent implements OnInit {
  
  dtb: any;

  count: number = 0;
  cost: number = 0;

  getCount(count: number) {

    this.count = count;

  }

  getCost(cost: number) {

    this.cost = cost;

  }

  ngOnInit() {

    window.addEventListener('scroll', this.scrolling, true);
    this.clientsevice.count$.subscribe((c: number) => this.getCount(c));
    this.clientsevice.price$.subscribe((p: number) => this.getCost(p));
  }
  constructor(private readonly clientsevice: ClientService) {

    this.dtb = document.getElementById("dtb");
    
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

