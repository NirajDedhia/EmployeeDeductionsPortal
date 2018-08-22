import { TestBed, inject } from '@angular/core/testing';

import { PlanServiceService } from './plan-service.service';

describe('PlanServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanServiceService]
    });
  });

  it('should be created', inject([PlanServiceService], (service: PlanServiceService) => {
    expect(service).toBeTruthy();
  }));
});
