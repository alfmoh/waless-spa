/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SiteTitleResolverService } from './site-title-resolver.service';

describe('Service: SiteTitleResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SiteTitleResolverService]
    });
  });

  it('should ...', inject([SiteTitleResolverService], (service: SiteTitleResolverService) => {
    expect(service).toBeTruthy();
  }));
});
