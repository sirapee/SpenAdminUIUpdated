import { TestBed } from '@angular/core/testing';

import { KycDocumentService } from './kyc-document.service';

describe('KycDocumentService', () => {
  let service: KycDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KycDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
