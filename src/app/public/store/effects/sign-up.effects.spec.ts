import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { createMockCredentials } from '../../../../mocks/objects/credentials.mock';
import { mockServiceProviders } from '../../../../mocks/providers.mock';
import { mockStoreModules } from '../../../../mocks/store.mock';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import * as RouterActions from '../../../core/store/actions/router.actions';
import { appReducers } from '../../../core/store/reducers/index';
import * as GettingStartedActions from '../actions/sign-up.actions';
import { publicReducers } from '../reducers/index';
import { initialSignUpReducerState } from '../reducers/sign-up.reducer';
import { SignUpEffects } from './sign-up-effects.service';

describe('SignUpEffects', () => {
  let effects: SignUpEffects;
  let actions: Observable<any>;

  const providers = [
    SignUpEffects,
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
    effects = TestBed.get(SignUpEffects);
  };

  beforeEach(async(() => {
  }));

  describe('submit$', () => {
    it('should dispatch SignUpActions.CreateOrganization if joinExistingOrganization is false', async(() => {
      configureDefault();
      actions = hot('a', {
        a: new GettingStartedActions.Submit(),
      });
      const expected = cold('b', {
        b: new GettingStartedActions.CreateOrganization(),
      });
      expect(effects.submit$).toBeObservable(expected);
    }));

    it('should dispatch SignUpActions.JoinOrganization if joinExistingOrganization is true', async(() => {
      TestBed.configureTestingModule({
        providers,
        imports: [
          StoreModule.forRoot(appReducers),
          StoreModule.forFeature('signUp', publicReducers, {
            initialState: {
              gettingStarted: {
                ...initialSignUpReducerState,
                joinExistingOrganization: true,
              },
            },
          }),
        ],
      });
      effects = TestBed.get(SignUpEffects);
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
