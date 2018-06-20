import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { ErrorService, MockErrorService, UserService } from '../../services/index';
import { getTestUsers, User } from '../../models/index';

describe('UserService', () => {
  let service: UserService;
  let testUser: User;

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
    testUser = getTestUsers()[0];
    testUser.firstName = 'tED';
    testUser.lastName = 'mAdEr';
  }));

  it('should be created', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));

  it('should convert data coming from the database', () => {
    const converted = service.convertIn(testUser);
    expect(converted).toEqual(getTestUsers()[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.convertOut(testUser);
    const userClone = getTestUsers()[0];
    delete userClone.email;
    delete userClone.password;
    expect(converted).toEqual(userClone);
  });
});
