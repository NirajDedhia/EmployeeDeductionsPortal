import { TestBed, inject } from '@angular/core/testing';

import { EmplanmapServiceService } from './emplanmap-service.service';

describe('EmplanmapServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmplanmapServiceService]
    });
  });

  it('should be created', inject([EmplanmapServiceService], (service: EmplanmapServiceService) => {
    expect(service).toBeTruthy();
  }));
});
