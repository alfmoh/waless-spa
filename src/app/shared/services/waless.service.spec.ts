/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WalessService } from './waless.service';

describe('Service: Waless', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WalessService]
    });
  });

  it('should ...', inject([WalessService], (service: WalessService) => {
    expect(service).toBeTruthy();
  }));
});
