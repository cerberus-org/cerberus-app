import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { MockErrorService } from '../../../mocks/classes/error.service.mock';
import { createMockMembers } from '../../../mocks/objects/member.mock';
import { Member } from '../../shared/models/index';
import { ErrorService } from './error.service';
import { MemberService } from './member.service';

describe('MemberService', () => {
  let service: MemberService;
  let member: Member;

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
    member = createMockMembers()[0];
    member.firstName = 'tED';
    member.lastName = 'mAdEr';
  }));

  it('should be created', inject([MemberService], (userService: MemberService) => {
    expect(userService).toBeTruthy();
  }));

  it('should convert data coming from the database', () => {
    const converted = service.mapDocToObject(member);
    expect(converted).toEqual(createMockMembers()[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.mapObjectToDoc(member);
    const userClone = createMockMembers()[0];
    expect(converted).toEqual(userClone);
  });
});
