import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { testUsers, User } from '../models/user';
import { ErrorService, MockErrorService } from './error.service';
import { UserService } from './user.service';

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

  it('should be created', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));

  it('should convert data coming from the database', () => {
    const converted = service.convertIn(user);
    expect(converted).toEqual(testUsers[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.convertOut(user);
    expect(converted).toEqual({
      firstName: testUsers[0].firstName,
      lastName: testUsers[0].lastName,
      organizationId: testUsers[0].organizationId,
      id: testUsers[0].id,
    });
  });
});
