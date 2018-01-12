import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import * as LogInActions from '../actions/login.actions';
import * as RouterActions from '../actions/router.actions';
import { testLoginCredentials, testUsers } from '../models/user';
import { AuthService, MockAuthService } from '../services/auth.service';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockUserService, UserService } from '../services/user.service';
import { LoginEffects } from './login.effects';

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

  describe('verify$', () => {

    it('should dispatch RouterActions.Go', () => {
      const verify = new LogInActions.Verify({});
      const go = new RouterActions.Go({ path: ['/settings'] });

      actions = hot('a', { a: verify });
      const expected = cold('b', { b: go });

      expect(effects.verify$).toBeObservable(expected);
    });
  });

  describe('logout$', () => {

    it('should emit the logoutSuccess snackbar and dispatch RouterActions.Go', (() => {
      const logout = new LogInActions.LogOut({});
      const go = new RouterActions.Go({ path: ['/login'] });
      const logoutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'logoutSuccess');

      actions = hot('a', { a: logout });
      const expected = cold('b', { b: go });

      effects.logout$.subscribe(() => {
        expect(logoutSuccessSpy).toHaveBeenCalled();
      });
      expect(effects.logout$).toBeObservable(expected);
    }));
  });
});
