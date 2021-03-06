import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { createMockCredentials } from '../../../mocks/objects/credentials.mock';
import { mockProviders } from '../../../mocks/providers.mock';
import { mockStoreModules } from '../../../mocks/store.mock';
import { Go } from '../../core/actions/router.actions';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { ResetPassword, SignIn, SignOut, VerifyPassword } from '../actions/auth.actions';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
        ...mockProviders,
      ],
      imports: [
        RouterTestingModule,
        ...mockStoreModules,
      ],
    });
    effects = TestBed.get(AuthEffects);
  }));

  describe('signIn$', () => {

    it('should dispatch Go', () => {
      actions = hot('a', {
        a: new SignIn({ credentials: createMockCredentials()[0] }),
      });
      const expected = cold('b', {
        b: new Go({ path: ['teams'] }),
      });
      expect(effects.signIn$).toBeObservable(expected);
    });

    it('should open the signInSuccess snackbar', () => {
      actions = hot('a', {
        a: new SignIn({ credentials: createMockCredentials()[0] }),
      });
      const loginSuccessSpy = spyOn(TestBed.get(SnackBarService), 'signInSuccess');
      effects.signIn$.subscribe(() => {
        expect(loginSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('verifyPassword$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new VerifyPassword({ password: 'testtest' }),
      });
    }));

    it('should dispatch Go', () => {
      const expected = cold('b', {
        b: new Go({ path: ['team/settings'] }),
      });
      expect(effects.verifyPassword$).toBeObservable(expected);
    });
  });

  describe('signOut$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new SignOut(),
      });
    }));

    it('should dispatch Go', () => {
      const expected = cold('b', {
        b: new Go({ path: [''] }),
      });
      expect(effects.signOut$).toBeObservable(expected);
    });

    it('should open the signOutSuccess snackbar', () => {
      const logoutSuccessSpy = spyOn(TestBed.get(SnackBarService), 'signOutSuccess');
      effects.signOut$.subscribe(() => {
        expect(logoutSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('resetPassword$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new ResetPassword({ email: createMockCredentials()[0].email }),
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
