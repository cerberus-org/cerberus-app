import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthService } from './auth.service';
import { MockOrganizationService, OrganizationService } from './organization.service';
import { MockUserService, UserService } from './user.service';
import { testOrganizations } from '../models/organization';
import { testUsers } from '../models/user';

describe('AuthService', () => {
  let service: AuthService;
  let afUser: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: null },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: UserService, useClass: MockUserService }
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

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('sets localStorage items and returns the user', () => {
    service.setItems(afUser).subscribe(user => {
      expect(user).toEqual(Object.assign(testUsers[0], afUser));
      expect(localStorage.getItem('user')).toBeTruthy();
      expect(localStorage.getItem('organization')).toBeTruthy();
    });
  });
});
