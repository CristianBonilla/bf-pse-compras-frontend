import { TestBed } from '@angular/core/testing';

import { TransactionAlertService } from './transaction-alert.service';

describe('TransactionAlertService', () => {
  let service: TransactionAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
