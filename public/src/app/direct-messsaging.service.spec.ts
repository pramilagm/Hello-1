import { TestBed } from '@angular/core/testing';

import { DirectMesssagingService } from './direct-messsaging.service';

describe('DirectMesssagingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectMesssagingService = TestBed.get(DirectMesssagingService);
    expect(service).toBeTruthy();
  });
});
