import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { testUsers, User } from '../models';
import { ErrorService, MockErrorService, UserService } from './services';

describe('UserService', () => {
  let service: UserService;
  let user: User;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(UserService);
    user = Object.assign({}, testUsers[0]);
    user.firstName = 'tED';
    user.lastName = 'mAdEr';
  }));

  it('should be created', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));

  it('should convert data coming from the database', () => {
    const converted = service.convertIn(user);
    expect(converted).toEqual(testUsers[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.convertOut(user);
    delete testUsers[0].email;
    delete testUsers[0].password;
    expect(converted).toEqual(testUsers[0]);
  });
});
