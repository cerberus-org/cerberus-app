import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';

import * as SettingsActions from '../actions/settings.actions';
import { testUsers } from '../models/user';
import { AuthService, MockAuthService } from '../services/auth.service';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { SettingsEffects } from './settings.effects';
import * as LogInActions from '../actions/login.actions';
import * as RouterActions from '../actions/router.actions';

describe('SettingsEffects', () => {
  let effects: SettingsEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions),
        { provide: AuthService, useClass: MockAuthService },
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: OrganizationService, useClass: MockOrganizationService }
      ],
    });
    effects = TestBed.get(SettingsEffects);
  }));

  describe('updateUser$', () => {

    it('should emit updateUserSuccess snackbar, on success', (() => {
      const updateUserSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateUserSuccess');

      effects.updateUser$.subscribe(() => {
        expect(updateUserSuccessSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('updateOrganization$', () => {

    it('should emit updateOrganizationSuccess snackbar, on success', (() => {
      const updateOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateOrganizationSuccess');

      effects.updateOrganization$.subscribe(() => {
        expect(updateOrganizationSuccessSpy).toHaveBeenCalled();
      });
    }));
  });
});
