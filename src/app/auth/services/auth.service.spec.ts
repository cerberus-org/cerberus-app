import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { MemberService } from '../../data/services/member.service';
import { OrganizationService } from '../../data/services/organization.service';
import { MockErrorService } from '../../mock/classes/error.service.mock';
import { MockOrganizationService } from '../../mock/classes/organization.service.mock';
import { MockUserService } from '../../mock/classes/user.service.mock';
import { mockMembers } from '../../mock/objects/member.mock';
import { mockStoreModules } from '../../mock/store-modules.mock';
import { ErrorService } from '../../shared/services/error.service';
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
