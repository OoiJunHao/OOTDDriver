import { TestBed } from '@angular/core/testing';

import { OrderAcceptanceServiceService } from './order-acceptance-service.service';

describe('OrderAcceptanceServiceService', () => {
  let service: OrderAcceptanceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderAcceptanceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
