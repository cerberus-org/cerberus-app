import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { getTestUsers, testOrganizations } from '../../../models';
import { SnackBarService } from '../../../services';
import { mockServiceProviders } from '../../../services/mock-service-providers';
import * as GettingStartedActions from '../actions/getting-started.actions';
import * as LoginActions from '../actions/login.actions';
import { GettingStartedEffects } from './getting-started.effects';

describe('GettingStartedEffects', () => {
  let effects: GettingStartedEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        GettingStartedEffects,
        provideMockActions(() => actions),
      ].concat(mockServiceProviders),
    });
    effects = TestBed.get(GettingStartedEffects);
  }));

  describe('gettingStarted$', () => {
    it('should dispatch LoginActions.LogIn', () => {
      const organization = testOrganizations[0];
      const user = getTestUsers()[0];

      actions = hot('a', {
        a: new GettingStartedActions.Submit({ organization, user }),
      });
      const expected = cold('b', {
        b: new LoginActions.LogIn(user),
      });
      expect(effects.submit$).toBeObservable(expected);
    });

    it('should open the addOrganizationSuccess snackbar', () => {
      const addOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'addOrganizationSuccess');
      effects.submit$.subscribe(() => {
        expect(addOrganizationSuccessSpy).toHaveBeenCalled();
      });
    });
  });
});
