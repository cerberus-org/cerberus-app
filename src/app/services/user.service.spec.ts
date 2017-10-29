import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions } from '@angular/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { UserService } from './user.service';
import { ErrorService, MockErrorService } from './error.service';

describe('UserService', () => {
  let service: UserService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule
      ],
      providers: [
        BaseRequestOptions,
        UserService,
        { provide: ErrorService, useClass: MockErrorService }
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(UserService);
  }));

  it('is created', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));
});
