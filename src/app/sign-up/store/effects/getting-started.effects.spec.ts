import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { getMockOrganizations } from '../../../mock/objects/organization.mock';
import { getMockUsers } from '../../../mock/objects/user.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { User } from '../../../models/index';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import * as GettingStartedActions from '../actions/getting-started.actions';
import { GettingStartedEffects } from './getting-started.effects';

describe('GettingStartedEffects', () => {
  let effects: GettingStartedEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        GettingStartedEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
    });
    effects = TestBed.get(GettingStartedEffects);
  }));

  describe('gettingStarted$', () => {
    let user: User;

    beforeEach(async(() => {
      const organization = getMockOrganizations()[0];
      user = getMockUsers()[0];
      actions = hot('a', {
        a: new GettingStartedActions.Submit({ organization, user }),
      });
    }));

    it('should dispatch SessionActions.LogIn', () => {
      const expected = cold('b', {
        b: new AuthActions.LogIn(user),
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
