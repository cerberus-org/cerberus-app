import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/index';

import * as AuthActions from '../actions/auth.actions';
import { testFirebaseUsers, testOrganizations, testUsers } from '../models';
import { mockServiceProviders } from '../services/mock-service-providers';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    actions = Observable.of('');
    TestBed.configureTestingModule({
      providers: [
        AuthEffects,
        provideMockActions(() => actions),
      ].concat(mockServiceProviders),
    });
    effects = TestBed.get(AuthEffects);
  }));

  describe('loadData$', () => {
    it('should dispatch AuthActions.LoadDataSuccess', (() => {
      actions = hot('a', {
        a: new AuthActions.LoadData(testFirebaseUsers[0]),
      });
      const expected = cold('b', {
        b: new AuthActions.LoadDataSuccess({
          user: testUsers[0],
          organization: testOrganizations[0],
        }),
      });
      expect(effects.loadData$).toBeObservable(expected);
    }));
  });
});
