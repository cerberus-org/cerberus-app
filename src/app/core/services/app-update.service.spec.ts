import { async, inject, TestBed } from '@angular/core/testing';
import { SwUpdate } from '@angular/service-worker';
import { EMPTY, Subscription } from 'rxjs';
import { MockSnackBarService } from '../../../mocks/classes/snack-bar.service.mock';

import { AppUpdateService } from './app-update.service';
import { SnackBarService } from './snack-bar.service';

class MockSwUpdate {
  available = EMPTY;
}

describe('AppUpdateService', () => {
  let service: AppUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppUpdateService,
        { provide: SwUpdate, useClass: MockSwUpdate },
        { provide: SnackBarService, useClass: MockSnackBarService },
      ],
    });
    service = TestBed.get(AppUpdateService);
  });

  it('should be created', inject([AppUpdateService], (injected: AppUpdateService) => {
    expect(injected).toBeTruthy();
  }));

  it('should subscribe to available updates', async(() => {
    expect(service.availableUpdateSubscription).toEqual(jasmine.any(Subscription));
  }));
});
