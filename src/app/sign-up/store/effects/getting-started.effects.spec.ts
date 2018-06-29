import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { createMockCredentials } from '../../../mock/objects/credentials.mock';
import { createMockMembers } from '../../../mock/objects/member.mock';
import { createMockOrganizations } from '../../../mock/objects/organization.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { mockStoreModules } from '../../../mock/store-modules.mock';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import * as GettingStartedActions from '../actions/getting-started.actions';
import { selectGettingStartedReducerState } from '../selectors/getting-started.selectors';
import { GettingStartedEffects } from './getting-started.effects';

describe('GettingStartedEffects', () => {
  let effects: GettingStartedEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    spyOn(selectGettingStartedReducerState, 'projector').and.returnValue({
      maxVisitedStep: 4,
      validOrganization: createMockOrganizations()[0],
      validUser: createMockMembers()[0],
      tosIsChecked: true,
    });
    TestBed.configureTestingModule({
      providers: [
        GettingStartedEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
      imports: [
        ...mockStoreModules,
      ],
    });
    effects = TestBed.get(GettingStartedEffects);
  }));

  describe('joinOrganization$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new GettingStartedActions.CreateOrganization(),
      });
    }));

    it('should dispatch AuthActions.SignIn', () => {
      const expected = cold('b', {
        b: new AuthActions.SignIn(createMockCredentials()[0]),
      });
      expect(effects.createOrganization$).toBeObservable(expected);
    });

    it('should open the createOrganizationSuccess snackbar', () => {
      const addOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'createOrganizationSuccess');
      effects.createOrganization$.subscribe(() => {
        expect(addOrganizationSuccessSpy).toHaveBeenCalled();
      });
    });
  });
});
