import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { createMockCredentials } from '../../../../mocks/objects/credentials.mock';
import { mockServiceProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store-modules.mock';
import * as RouterActions from '../../../core/store/actions/router.actions';
import { rootReducers } from '../../../core/store/reducers';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import * as GettingStartedActions from '../actions/getting-started.actions';
import { signUpReducers } from '../reducers';
import { initialGettingStartedReducerState } from '../reducers/getting-started.reducer';
import { GettingStartedEffects } from './getting-started.effects';

describe('GettingStartedEffects', () => {
  let effects: GettingStartedEffects;
  let actions: Observable<any>;

  const providers = [
    GettingStartedEffects,
    provideMockActions(() => actions),
    ...mockServiceProviders,
  ];

  const configureDefault = () => {
    TestBed.configureTestingModule({
      providers,
      imports: [
        ...mockStoreModules,
      ],
    });
    effects = TestBed.get(GettingStartedEffects);
  };

  beforeEach(async(() => {
  }));

  describe('submit$', () => {
    it('should dispatch GettingStartedActions.CreateOrganization if joinExistingOrganization is false', async(() => {
      configureDefault();
      actions = hot('a', {
        a: new GettingStartedActions.Submit(),
      });
      const expected = cold('b', {
        b: new GettingStartedActions.CreateOrganization(),
      });
      expect(effects.submit$).toBeObservable(expected);
    }));

    it('should dispatch GettingStartedActions.JoinOrganization if joinExistingOrganization is true', async(() => {
      TestBed.configureTestingModule({
        providers,
        imports: [
          StoreModule.forRoot(rootReducers),
          StoreModule.forFeature('signUp', signUpReducers, {
            initialState: {
              gettingStarted: {
                ...initialGettingStartedReducerState,
                joinExistingOrganization: true,
              },
            },
          }),
        ],
      });
      effects = TestBed.get(GettingStartedEffects);
      actions = hot('a', {
        a: new GettingStartedActions.Submit(),
      });
      const expected = cold('b', {
        b: new GettingStartedActions.JoinOrganization(),
      });
      expect(effects.submit$).toBeObservable(expected);
    }));
  });

  describe('createOrganization$', () => {
    beforeEach(async(() => {
      configureDefault();
      actions = hot('a', {
        a: new GettingStartedActions.CreateOrganization(),
      });
    }));

    it('should dispatch AuthActions.SignIn', async(() => {
      const expected = cold('b', {
        b: new AuthActions.SignIn(createMockCredentials()[0]),
      });
      expect(effects.createOrganization$).toBeObservable(expected);
    }));

    it('should open the createOrganizationSuccess snackbar', async(() => {
      const addOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'createOrganizationSuccess');
      effects.createOrganization$.subscribe(() => {
        expect(addOrganizationSuccessSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('joinOrganization$', () => {
    beforeEach(async(() => {
      configureDefault();
      actions = hot('a', {
        a: new GettingStartedActions.JoinOrganization(),
      });
    }));

    it('should dispatch RouterActions.Go', async(() => {
      const expected = cold('b', {
        b: new RouterActions.Go({ path: ['/home'] }),
      });
      expect(effects.joinOrganization$).toBeObservable(expected);
    }));

    it('should open the joinOrganizationSuccess snackbar', async(() => {
      const addOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'joinOrganizationSuccess');
      effects.joinOrganization$.subscribe(() => {
        expect(addOrganizationSuccessSpy).toHaveBeenCalled();
      });
    }));
  });
});
