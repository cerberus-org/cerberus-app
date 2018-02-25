import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import * as AuthActions from '../actions/auth.actions';
import { testOrganizations } from '../models/organization';
import { testFirebaseUsers, testUsers } from '../models/user';
import { AuthEffects } from './auth.effects';
import { SettingsEffects } from './settings.effects';
import { mockServices } from './mock-services';

describe('AuthEffects', () => {
  let effects: SettingsEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    actions = Observable.of('');
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
      ].concat(mockServices),
    });
    effects = TestBed.get(AuthEffects);
  }));

  describe('loadData$', () => {
    it('should dispatch AuthActions.LoadDataSuccess', (() => {
      actions = hot('a', {
        a: new AuthActions.LoadData(testFirebaseUsers[0])
      });
      const expected = cold('b', {
        b: new AuthActions.LoadDataSuccess({
          user: testUsers[0],
          organization: testOrganizations[0]
        })
      });
      expect(effects.loadData$).toBeObservable(expected);
    }));
  });
});
