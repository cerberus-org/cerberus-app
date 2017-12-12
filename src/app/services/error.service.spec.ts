import { async, getTestBed, inject, TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';
import { MockSnackBarService, SnackBarService } from './snack-bar.service';

describe('ErrorService', () => {
  let service: ErrorService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorService,
        { provide: SnackBarService, useClass: MockSnackBarService },
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(ErrorService);
  }));

  it('should be created', inject([ErrorService], (errorService: ErrorService) => {
    expect(errorService).toBeTruthy();
  }));

  it('should handle a Firebase error', () => {
    spyOn(service.snackBarService, 'open');
    const error = { code: '404', message: 'This is a test.', name: '', stack: undefined };
    const obs = service.handleFirebaseError(error);
    expect(service.snackBarService.open).toHaveBeenCalledWith(error.message);
    expect(obs).toBeTruthy();
  });
});
