import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { MockSnackBarService } from '../../../mocks/classes/snack-bar.service.mock';
import { ErrorService } from './error.service';
import { SnackBarService } from './snack-bar.service';

describe('ErrorService', () => {
  let service: ErrorService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorService,
        { provide: SnackBarService, useClass: MockSnackBarService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(ErrorService);
  }));

  it('should be created', inject([ErrorService], (errorService: ErrorService) => {
    expect(errorService).toBeTruthy();
  }));

  it('should handle a Firebase error', () => {
    spyOn(service.snackBarService, 'open');
    const error = { code: '404', message: 'This is a mock.', name: '', stack: undefined };
    const obs = service.handleFirebaseError(error);
    expect(service.snackBarService.open).toHaveBeenCalledWith(error.message);
    expect(obs).toBeTruthy();
  });

  it('should handle a Firebase error on unsuccessful login', () => {
    spyOn(service.snackBarService, 'signInError');
    const error = { code: '404', message: 'This is a mock.', name: '', stack: undefined };
    const obs = service.handleLoginError(error);
    expect(service.snackBarService.signInError).toHaveBeenCalled();
    expect(obs).toBeTruthy();
  });
});
