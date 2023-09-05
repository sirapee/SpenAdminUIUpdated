import { TestBed } from '@angular/core/testing';

import { VirtualAccountService } from './virtual-account.service';

describe('VirtualAccountService', () => {
  let service: VirtualAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
