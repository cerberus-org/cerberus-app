import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { MockErrorService } from '../../mock/classes/error.service.mock';
import { createMockMembers } from '../../mock/objects/member.mock';
import { Member } from '../../models';
import { ErrorService } from '../../shared/services/error.service';
import { MemberService } from './member.service';

describe('MemberService', () => {
  let service: MemberService;
  let testUser: Member;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MemberService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(MemberService);
    testUser = createMockMembers()[0];
    testUser.firstName = 'tED';
    testUser.lastName = 'mAdEr';
  }));

  it('should be created', inject([MemberService], (userService: MemberService) => {
    expect(userService).toBeTruthy();
  }));

  it('should convert data coming from the database', () => {
    const converted = service.mapDocToObject(testUser);
    expect(converted).toEqual(createMockMembers()[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.mapObjectToDoc(testUser);
    const userClone = createMockMembers()[0];
    delete userClone.email;
    delete userClone.password;
    expect(converted).toEqual(userClone);
  });
});
