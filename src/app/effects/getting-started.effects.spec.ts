import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { cold, hot } from 'jasmine-marbles';

import { GettingStartedEffects } from './getting-started.effects';
import { Submit } from '../actions/getting-started.actions';
import { LogIn } from '../actions/login.actions';
import { AuthService, MockAuthService } from '../services/auth.service';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockSiteService, SiteService } from '../services/site.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockUserService, UserService } from '../services/user.service';
import { testOrganizations } from '../models/organization';
import { testUsers } from '../models/user';

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

    it('creates the organization, site, and user, displays the addOrganizationSuccess snackbar, returns a LOG_IN action, on success', async(() => {
      const organization = testOrganizations[0];
      const user = testUsers[0];
      const submit = new Submit({ organization, user });
      const login = new LogIn(user);
      const addOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'addOrganizationSuccess');

      actions = hot('a', { a: submit });
      const expected = cold('b', { b: login });

      effects.submit$.subscribe(() => {
        expect(addOrganizationSuccessSpy).toHaveBeenCalled();
      });
      expect(effects.submit$).toBeObservable(expected);
    }));
  });
});
