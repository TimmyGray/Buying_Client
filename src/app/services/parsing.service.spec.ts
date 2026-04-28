import { TestBed } from '@angular/core/testing';
import { ParsingService } from './parsing.service';

describe('ParsingService', () => {
  let service: ParsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParsingService);
  });

  it('should split item string by delimiter', () => {
    expect(service.parseItem('a;b;c', ';')).toEqual(['a', 'b', 'c']);
  });
});
