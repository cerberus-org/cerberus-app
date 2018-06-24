import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { getMockLoginCredentials } from '../../../mock/objects/user.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import * as RouterActions from '../../../root/store/actions/router.actions';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import * as AuthActions from '../actions/auth.actions';
import { authReducers } from '../reducers';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forFeature('auth', authReducers),
      ],
    });
    effects = TestBed.get(AuthEffects);
  }));

  describe('login$', () => {

    it('should dispatch RouterActions.Go', () => {
      actions = hot('a', {
        a: new AuthActions.LogIn(getMockLoginCredentials()[0]),
      });
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['/dashboard'] }),
      });
      expect(effects.login$).toBeObservable(expected);
    });

    it('should open the accountNotVerified snackbar if role is locked', () => {
      actions = hot('a', {
        a: new AuthActions.LogIn(getMockLoginCredentials()[2]),
      });
      const accountNotVerifiedSpy = spyOn(TestBed.get(SnackBarService), 'accountNotVerified');
      effects.login$.subscribe(() => {
        expect(accountNotVerifiedSpy).toHaveBeenCalled();
      });
    });

    it('should open the loginSuccess snackbar', () => {
      actions = hot('a', {
        a: new AuthActions.LogIn(getMockLoginCredentials()[0]),
      });
      const loginSuccessSpy = spyOn(TestBed.get(SnackBarService), 'loginSuccess');
      effects.login$.subscribe(() => {
        expect(loginSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('verifyPassword$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new AuthActions.VerifyPassword({ email: '', password: '' }),
      });
    }));

    it('should dispatch RouterActions.Go', () => {
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['/settings'] }),
      });
      expect(effects.verifyPassword$).toBeObservable(expected);
    });
  });

  describe('logout$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new AuthActions.LogOut(),
      });
    }));

    it('should dispatch RouterActions.Go', () => {
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['/home'] }),
      });
      expect(effects.logout$).toBeObservable(expected);
    });

    it('should open the logoutSuccess snackbar', () => {
      const logoutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'logoutSuccess');
      effects.logout$.subscribe(() => {
        expect(logoutSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('resetPassword$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new AuthActions.ResetPassword(getMockLoginCredentials()[0].email),
      });
    }));

    it('should open the resetPassword snackbar', () => {
      const resetPasswordSuccessSpy = spyOn(TestBed.get(SnackBarService), 'resetPassword');
      effects.resetPassword$.subscribe(() => {
        expect(resetPasswordSuccessSpy).toHaveBeenCalled();
      });
    });
  });
});
