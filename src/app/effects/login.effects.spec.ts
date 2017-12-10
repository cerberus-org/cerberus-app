import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { hot } from 'jasmine-marbles';

import { LogIn, LogOut } from '../actions/login.actions';
import { LoginEffects } from './login.effects';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
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
      const login = new LogIn(user);
      const loginSuccessSpy = spyOn(TestBed.get(SnackBarService), 'loginSuccess');

      actions = hot('a', { a: login });

      effects.login$.subscribe(() => {
        expect(loginSuccessSpy).toHaveBeenCalledWith(testUsers[0].firstName);
      });
    });
  });

  describe('logout$', () => {

    it('removes items from localStorage, navigates to the login page, and displays the logoutSuccess snackbar, on success', async(() => {
      const logout = new LogOut({});
      const logoutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'logoutSuccess');

      actions = hot('a', { a: logout });

      effects.login$.subscribe(() => {
        expect(logoutSuccessSpy).toHaveBeenCalled();
      });
    }));
  });
});
