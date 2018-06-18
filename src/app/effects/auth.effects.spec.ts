import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { of } from 'rxjs';
import { Observable } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { getTestUsers, testFirebaseUsers, testOrganizations, testUsers } from '../models';
import { mockServiceProviders } from '../services/mock-service-providers';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let effects: AuthEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    actions = of('');
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
          user: getTestUsers()[0],
          organization: testOrganizations[0],
        }),
      });
      expect(effects.loadData$).toBeObservable(expected);
    }));
  });
});
