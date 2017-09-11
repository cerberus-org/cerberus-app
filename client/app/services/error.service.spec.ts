import { TestBed, inject, async, getTestBed, } from '@angular/core/testing';
import ErrorService from './error.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MdSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        ErrorService
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
