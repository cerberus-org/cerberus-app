import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import * as GettingStartedActions from '../actions/getting-started.actions';
import * as LoginActions from '../actions/login.actions';
import { testOrganizations } from '../models/organization';
import { testUsers } from '../models/user';
import { AuthService, MockAuthService } from '../services/auth.service';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockSiteService, SiteService } from '../services/site.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockUserService, UserService } from '../services/user.service';
import { GettingStartedEffects } from './getting-started.effects';

describe('GettingStartedEffects', () => {
  let effects: GettingStartedEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        GettingStartedEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: MockAuthService },
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: SiteService, useClass: MockSiteService },
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: UserService, useClass: MockUserService }
      ],
    });
    effects = TestBed.get(GettingStartedEffects);
  }));

  describe('gettingStarted$', () => {
    it('should dispatch LoginActions.LogIn', () => {
      const organization = testOrganizations[0];
      const user = testUsers[0];

      actions = hot('a', {
        a: new GettingStartedActions.Submit({ organization, user })
      });
      const expected = cold('b', {
        b: new LoginActions.LogIn(user)
      });
      expect(effects.submit$).toBeObservable(expected);
    });

    it('should open the addOrganizationSuccess snackbar', () => {
      const addOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'addOrganizationSuccess');
      effects.submit$.subscribe(() => {
        expect(addOrganizationSuccessSpy).toHaveBeenCalled();
      });
    })
  });
});
