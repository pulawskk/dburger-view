import { TestBed } from '@angular/core/testing';

import { BurgerDataService } from './burger-data.service';

describe('BurgerDataService', () => {
  let service: BurgerDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurgerDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
