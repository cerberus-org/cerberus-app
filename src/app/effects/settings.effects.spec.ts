import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import * as SettingsActions from '../actions/settings.actions';
import { testUsers } from '../models/user';
import { AuthService, MockAuthService } from '../services/auth.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { SettingsEffects } from './settings.effects';

describe('SettingsEffects', () => {
  let effects: SettingsEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: MockAuthService },
        { provide: SnackBarService, useClass: MockSnackBarService },
      ],
    });
    effects = TestBed.get(SettingsEffects);
  }));

  describe('updateUser$', () => {

    it('should return a UPDATE_USER_SUCCESS action and emit updateUserSuccess snackbar, on success', (() => {
      const updateUser = new SettingsActions.UpdateUser(testUsers[0]);
      const updateUserSuccess = new SettingsActions.UpdateUserSuccess();
      const updateUserSuccessSnackbarSpy = spyOn(TestBed.get(SnackBarService), 'updateUserSuccess');

      actions = hot('a', { a: updateUser });
      const expected = cold('b', { b: updateUserSuccess });

      expect(effects.updateUser$).toBeObservable(expected);
      expect(updateUserSuccessSnackbarSpy).toHaveBeenCalled();
    }));
  });
});
