import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BuyService } from './buy.service';
import { environment } from '../../environments/environment';

describe('BuyService', () => {
  let service: BuyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BuyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should request buys list', () => {
    service.getBuys().subscribe((res) => {
      expect(res.length).toBe(1);
      expect(res[0].itemId).toBe('legacy-item');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/buys`);
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        id: '1',
        name: 'Buy',
        description: 'desc',
        cost: 1,
        item: 'a;b;c',
        itemid: 'legacy-item',
        count: 1,
        image: { id: 'img1', name: 'n', size: 1, type: 'image/png', data: '' },
      },
    ]);
  });

  it('should request image by new backend route', () => {
    service.getImage('abc').subscribe();
    const req = httpMock.expectOne(`${environment.apiUrl}/buys/image/abc`);
    expect(req.request.method).toBe('GET');
  });

  it('should return empty array when backend payload is not an array', () => {
    service.getBuys().subscribe((res) => {
      expect(res).toEqual([]);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/buys`);
    expect(req.request.method).toBe('GET');
    req.flush({ unexpected: true });
  });
});
