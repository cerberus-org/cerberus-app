import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { UserService } from './user.service';
import { ErrorService, MockErrorService } from './error.service';
import { testUsers, User } from '../models/user';

describe('UserService', () => {
  let service: UserService;
  let user: User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService }
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(UserService);
    user = Object.assign({}, testUsers[0]);
    user.firstName = 'tED';
    user.lastName = 'mAdEr';
  }));

  it('is created', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));

  it('converts coming from the database', () => {
    const converted = service.convertIn(user);
    expect(converted).toEqual(testUsers[0]);
  });

  it('converts data going to the database', () => {
    const converted = service.convertOut(user);
    expect(converted).toEqual(testUsers[0]);
  });
});
