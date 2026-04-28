import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './htmls/app.component.html',
    styleUrls: ['../styles/app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {

  count: number = 0;
  cost: number = 0;
  readonly body: HTMLElement;
  private readonly destroy$ = new Subject<void>();

  private getCount(count: number) {

    this.count = count;

  }

  private getCost(cost: number) {

    this.cost = cost;

  }

  ngOnInit() {

    this.clientsevice.count$
      .pipe(takeUntil(this.destroy$))
      .subscribe((c: number) => this.getCount(c));
    this.clientsevice.price$
      .pipe(takeUntil(this.destroy$))
      .subscribe((p: number) => this.getCost(p));

  }
  constructor(
    private readonly clientsevice: ClientService,
    @Inject(DOCUMENT) documentRef: Document) {
    this.body = documentRef.body ?? documentRef.documentElement;
  }  

  clickOnLink() {

    //alert("Change");
    //console.log(this.url);

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
