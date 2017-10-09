import { async, getTestBed, inject, TestBed, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorService } from './error.service';
import { MockSnackBarService, SnackBarService } from './snack-bar.service';

describe('UserService', () => {
  let service: ErrorService = null;
  let error: Response = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatSnackBarModule,
        BrowserAnimationsModule
      ],
      providers: [
        ErrorService,
        { provide: SnackBarService, useClass: MockSnackBarService },
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(ErrorService);
  }));

  it('is created', inject([ErrorService], (errorService: ErrorService) => {
    expect(errorService).toBeTruthy();
  }));

  it('401 error', () => {
    error = new Response(401);
    service.handleHttpError(error);
    expect(localStorage.token).toBeUndefined();
  });
});
