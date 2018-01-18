import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';

import { StoreModule } from '@ngrx/store';
import { testUsers } from '../models/user';
import { reducers } from '../reducers';
import { AuthService } from './auth.service';
import { ErrorService, MockErrorService } from './error.service';
import { MockOrganizationService, OrganizationService } from './organization.service';
import { MockUserService, UserService } from './user.service';

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
        { provide: UserService, useClass: MockUserService }
      ],
      imports: [
        StoreModule.forRoot(reducers)
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(AuthService);
    afUser = {
      uid: testUsers[0].id,
      displayName: 'tlmader',
      email: 'tlmader.dev@gmail.com'
    }
  }));

  it('should be created', inject([AuthService], (authService: AuthService) => {
    expect(authService).toBeTruthy();
  }));
});
