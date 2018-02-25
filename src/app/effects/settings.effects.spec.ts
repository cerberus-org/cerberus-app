import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import * as AuthActions from '../actions/auth.actions';
import * as SettingsActions from '../actions/settings.actions';
import { AuthService, MockAuthService } from '../services/auth.service';
import { CsvService, MockCsvService } from '../services/csv.service';
import { MockOrganizationService, OrganizationService } from '../services/organization.service';
import { MockSnackBarService, SnackBarService } from '../services/snack-bar.service';
import { MockVisitService, VisitService } from '../services/visit.service';
import { MockVolunteerService, VolunteerService } from '../services/volunteer.service';
import { SettingsEffects } from './settings.effects';
import { testOrganizations } from '../models/organization';
import { testUsers } from '../models/user';
import { mockServices } from './mock-services';

describe('SettingsEffects', () => {
  let effects: SettingsEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    actions = Observable.of('');
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions),
      ].concat(mockServices),
    });
    effects = TestBed.get(SettingsEffects);
  }));

  describe('updateOrganization$', () => {
    it('should dispatch AuthActions.UpdateOrganization', (() => {
      const organization = testOrganizations[0];
      actions = hot('a', {
        a: new SettingsActions.UpdateOrganization(organization)
      });
      const expected = cold('b', {
        b: new AuthActions.UpdateOrganization(organization)
      });
      expect(effects.updateOrganization$).toBeObservable(expected);
    }));

    it('should open the updateOrganizationSuccess snackbar', () => {
      const updateOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateOrganizationSuccess');

      effects.updateOrganization$.subscribe(() => {
        expect(updateOrganizationSuccessSpy).toHaveBeenCalled();
      });
    })
  });

  describe('updateUser$', () => {
    it('should dispatch AuthActions.UpdateUser', (() => {
      const user = testUsers[0];
      actions = hot('a', {
        a: new SettingsActions.UpdateUser(user)
      });
      const expected = cold('b', {
        b: new AuthActions.UpdateUser(user)
      });
      expect(effects.updateUser$).toBeObservable(expected);
    }));

    it('should open the updateUserSuccess snackbar', () => {
      const updateUserSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateUserSuccess');
      effects.updateUser$.subscribe(() => {
        expect(updateUserSuccessSpy).toHaveBeenCalled();
      });
    })
  });

  describe('generateVisitHistoryReport$', () => {
    it('should emit download csv, on success', (() => {
      const downloadCsvSpy = spyOn(TestBed.get(CsvService), 'downloadAsCsv');
      effects.generateVisitHistoryReport$.subscribe(() => {
        expect(downloadCsvSpy).toHaveBeenCalled();
      });
    }));
  });
});
