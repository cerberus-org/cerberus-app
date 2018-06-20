import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { MockErrorService } from '../../mock/classes/error.service.mock';
import { getMockUsers } from '../../mock/objects/user.mock';
import { User } from '../../models';
import { ErrorService } from '../../shared/services/error.service';
import { UserService } from './user.service';

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
    testUser = getMockUsers()[0];
    testUser.firstName = 'tED';
    testUser.lastName = 'mAdEr';
  }));

  it('should be created', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));

  it('should convert data coming from the database', () => {
    const converted = service.convertIn(testUser);
    expect(converted).toEqual(getMockUsers()[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.convertOut(testUser);
    const userClone = getMockUsers()[0];
    delete userClone.email;
    delete userClone.password;
    expect(converted).toEqual(userClone);
  });
});
