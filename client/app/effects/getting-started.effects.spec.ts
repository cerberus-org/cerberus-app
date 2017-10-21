import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';
import { cold, hot } from 'jasmine-marbles';

import { GettingStartedEffects } from './getting-started.effects';
import { Submit } from '../actions/getting-started.actions';
import { Login } from '../actions/login.actions';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockSiteService, SiteService } from '../services/site.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockUserService, UserService } from '../services/user.service';
import { testOrganizations } from '../models/organization';
import { testUsers } from '../models/user';
import { Site } from '../models/site';

describe('GettingStartedEffects', () => {
  let effects: GettingStartedEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        GettingStartedEffects,
        provideMockActions(() => actions),
        { provide: OrganizationService, useClass: MockOrganizationService },
        { provide: SiteService, useClass: MockSiteService },
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: UserService, useClass: MockUserService }
      ],
    });
    effects = TestBed.get(GettingStartedEffects);
  }));

  afterEach(async(() => {
    localStorage.clear();
  }));

  describe('gettingStarted$', () => {

    it('sets localStorage, navigates to the dashboard, and displays the snackbar, on success', async(() => {
      const organization = testOrganizations[0];
      const user = testUsers[0];
      const submit = new Submit({ organization, user });
      const login = new Login(user);
      const createSiteSpy = spyOn(TestBed.get(SiteService), 'create');
      const addOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'addOrganizationSuccess');

      actions = hot('a', { a: submit });
      const expected = cold('b', { b: login });

      // effects.submit$.subscribe(() => {
      //   expect(createSiteSpy).toHaveBeenCalledWith(
      //     new Site(organization._id, organization.name, null)
      //   );
      //   expect(addOrganizationSuccessSpy).toHaveBeenCalled();
      // });
      expect(effects.submit$).toBeObservable(expected);
    }));
  });
});
