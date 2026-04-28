import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';
import { ClientService } from '../services/client.service';
import { MaterialModule } from '../modules/material.module';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  const count$ = new Subject<number>();
  const price$ = new Subject<number>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, MaterialModule, FlexLayoutModule, NoopAnimationsModule],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        {
          provide: ClientService,
          useValue: {
            count$: count$.asObservable(),
            price$: price$.asObservable(),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should update count and cost from client service streams', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.componentInstance.ngOnInit();

    count$.next(4);
    price$.next(125.5);

    expect(fixture.componentInstance.count).toBe(4);
    expect(fixture.componentInstance.cost).toBe(125.5);
  });
});
