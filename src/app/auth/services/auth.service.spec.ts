import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { OrganizationService } from '../../data/services/organization.service';
import { UserService } from '../../data/services/user.service';
import { MockErrorService } from '../../mock/classes/error.service.mock';
import { MockOrganizationService } from '../../mock/classes/organization.service.mock';
import { MockUserService } from '../../mock/classes/user.service.mock';
import { mockUsers } from '../../mock/objects/user.mock';
import { ErrorService } from '../../shared/services/error.service';
import { authReducers } from '../store/reducers';
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
        { provide: UserService, useClass: MockUserService },
      ],
      imports: [
        StoreModule.forRoot(authReducers),
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(AuthService);
    afUser = {
      uid: mockUsers[0].id,
      displayName: 'tlmader',
      email: 'tlmader.dev@gmail.com',
    };
  }));

  it('should be created', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));
});
