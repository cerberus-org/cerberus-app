import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { MockErrorService } from '../../../mocks/classes/error.service.mock';
import { ErrorService } from './error.service';
import { MemberService } from './member.service';

describe('MemberService', () => {
  let service: MemberService;

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
  }));

  it('should be created', inject([MemberService], (userService: MemberService) => {
    expect(userService).toBeTruthy();
  }));
});
