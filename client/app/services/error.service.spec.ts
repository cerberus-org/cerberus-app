import { TestBed, inject, async, getTestBed, } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MdSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ErrorService } from './error.service';
import { SnackBarService, MockSnackBarService } from './snack-bar.service';

describe('UserService', () => {
  let service: ErrorService = null;
  let error: Response = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MdSnackBarModule,
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
