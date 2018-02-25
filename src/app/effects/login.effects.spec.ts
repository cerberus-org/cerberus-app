import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import * as LogInActions from '../actions/login.actions';
import * as RouterActions from '../actions/router.actions';
import { testLoginCredentials } from '../models/user';
import { SnackBarService } from '../services/snack-bar.service';
import { LoginEffects } from './login.effects';
import { mockServices } from './mock-services';

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
      ].concat(mockServices),
    });
    effects = TestBed.get(LoginEffects);
  }));

  describe('login$', () => {
    it('should dispatch RouterActions.Go', () => {
      actions = hot('a', {
        a: new LogInActions.LogIn(testLoginCredentials)
      });
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['/dashboard'] })
      });

      expect(effects.login$).toBeObservable(expected);
    });

    it('should open the loginSuccess snackbar', () => {
      const loginSuccessSpy = spyOn(TestBed.get(SnackBarService), 'loginSuccess');

      effects.login$.subscribe(() => {
        expect(loginSuccessSpy).toHaveBeenCalled();
      });
    })
  });

  describe('verify$', () => {
    it('should dispatch RouterActions.Go', () => {
      actions = hot('a', {
        a: new LogInActions.Verify({ email: '', password: '' })
      });
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['/settings'] })
      });

      expect(effects.verify$).toBeObservable(expected);
    });
  });

  describe('logout$', () => {
    it('should dispatch RouterActions.Go', () => {
      actions = hot('a', {
        a: new LogInActions.LogOut()
      });
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['/login'] })
      });

      expect(effects.logout$).toBeObservable(expected);
    });

    it('should open the logoutSuccess snackbar', () => {
      const logoutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'logoutSuccess');

      effects.logout$.subscribe(() => {
        expect(logoutSuccessSpy).toHaveBeenCalled();
      });
    })
  });
});
