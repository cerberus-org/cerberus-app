import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { MockErrorService } from '../../../mocks/classes/error.service.mock';
import { MockOrganizationService } from '../../../mocks/classes/organization.service.mock';
import { MockUserService } from '../../../mocks/classes/user.service.mock';
import { mockMembers } from '../../../mocks/objects/member.mock';
import { mockStoreModules } from '../../../mocks/store.mock';
import { ErrorService } from '../../core/services/error.service';
import { MemberService } from '../../core/services/member.service';
import { OrganizationService } from '../../core/services/organization.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let afUser: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: null },
        { provide: ErrorService, useClass: MockErrorService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: MemberService, useClass: MockUserService },
      ],
      imports: [
        ...mockStoreModules,
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(AuthService);
    afUser = {
      uid: mockMembers[0].id,
      displayName: 'tlmader',
      email: 'tlmader.dev@gmail.com',
    };
  }));

  it('should be created', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));
});
