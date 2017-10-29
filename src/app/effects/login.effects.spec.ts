import { async, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { hot } from 'jasmine-marbles';

import { LoginEffects } from './login.effects';
import { Login, Logout } from '../actions/login.actions';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { testOrganizations } from '../models/organization';
import { testUsers } from '../models/user';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockUserService, UserService } from '../services/user.service';
import { AuthService, MockAuthService } from '../services/auth.service';

describe('LoginEffects', () => {
  let effects: LoginEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        LoginEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: MockAuthService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: UserService, useClass: MockUserService },
      ],
    });
    effects = TestBed.get(LoginEffects);
  }));

  afterEach(async(() => {
    localStorage.clear();
  }));

  describe('login$', () => {

    it('sets localStorage, navigates to the dashboard, and displays the loginSuccess snackbar, on success', () => {
      const user = testUsers[0];
      const login = new Login(user);
      const navigateByUrlSpy = spyOn(TestBed.get(Router), 'navigateByUrl');
      const loginSuccessSpy = spyOn(TestBed.get(SnackBarService), 'loginSuccess');

      actions = hot('a', { a: login });

      effects.login$.subscribe(() => {
        expect(localStorage.token).toEqual('token');
        expect(localStorage.userId).toEqual(user.id);
        expect(localStorage.userName).toEqual(user.firstName);
        expect(localStorage.organizationId).toEqual(user.organizationId);
        expect(localStorage.organizationName).toEqual(testOrganizations[0].name);

        expect(navigateByUrlSpy).toHaveBeenCalledWith('/dashboard');
        expect(loginSuccessSpy).toHaveBeenCalledWith(testUsers[0].firstName);
      });
    });
  });

  describe('logout$', () => {

    it('removes items from localStorage, navigates to the login page, and displays the logoutSuccess snackbar, on success', async(() => {
      const logout = new Logout({});
      const navigateByUrlSpy = spyOn(TestBed.get(Router), 'navigateByUrl');
      const logoutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'logoutSuccess');

      actions = hot('a', { a: logout });

      effects.login$.subscribe(() => {
        expect(localStorage.token).toBeFalsy();
        expect(localStorage.userId).toBeFalsy();
        expect(localStorage.userName).toBeFalsy();
        expect(localStorage.organizationId).toBeFalsy();
        expect(localStorage.organizationName).toBeFalsy();

        expect(navigateByUrlSpy).toHaveBeenCalledWith('/login');
        expect(logoutSuccessSpy).toHaveBeenCalled();
      });
    }));
  });
});
