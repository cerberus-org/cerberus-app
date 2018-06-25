import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { getMockOrganizations } from '../../../mock/objects/organization.mock';
import { getMockUsers } from '../../../mock/objects/user.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { rootReducers } from '../../../root/store/reducers';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import * as GettingStartedActions from '../actions/getting-started.actions';
import { signUpReducers } from '../reducers';
import { selectGettingStartedReducerState } from '../selectors/getting-started.selectors';
import { GettingStartedEffects } from './getting-started.effects';

describe('GettingStartedEffects', () => {
  let effects: GettingStartedEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    spyOn(selectGettingStartedReducerState, 'projector').and.returnValue({
      maxVisitedStep: 4,
      validOrganization: getMockOrganizations()[0],
      validUser: getMockUsers()[0],
      tosIsChecked: true,
    });
    TestBed.configureTestingModule({
      providers: [
        GettingStartedEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
      imports: [
        StoreModule.forRoot(rootReducers),
        StoreModule.forFeature('signUp', signUpReducers, {
          initialState: {
            gettingStarted: {
              maxVisitedStep: 4,
              validOrganization: getMockOrganizations()[0],
              validUser: getMockUsers()[0],
              tosIsChecked: true,
            },
          },
        }),
      ],
    });
    effects = TestBed.get(GettingStartedEffects);
  }));

  describe('submit$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new GettingStartedActions.Submit(),
      });
    }));

    it('should dispatch AuthActions.LogIn', () => {
      const expected = cold('b', {
        b: new AuthActions.LogIn(getMockUsers()[0]),
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
