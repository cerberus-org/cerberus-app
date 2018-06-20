import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { getMockOrganizations } from '../../mock/objects/organization.mock';
import { getMockUsers } from '../../mock/objects/user.mock';
import { mockServiceProviders } from '../../mock/providers.mock';
import * as AuthActions from '../../root/store/actions/auth.actions';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { CsvService } from '../services/csv.service';
import * as SettingsActions from './settings.actions';
import { SettingsEffects } from './settings.effects';

describe('SettingsEffects', () => {
  let effects: SettingsEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    actions = of('');
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
    });
    effects = TestBed.get(SettingsEffects);
  }));

  describe('updateOrganization$', () => {
    it('should dispatch AuthActions.UpdateOrganization', (() => {
      const organization = getMockOrganizations()[0];
      actions = hot('a', {
        a: new SettingsActions.UpdateOrganization(organization),
      });
      const expected = cold('b', {
        b: new AuthActions.UpdateOrganization(organization),
      });
      expect(effects.updateOrganization$).toBeObservable(expected);
    }));

    it('should open the updateOrganizationSuccess snackbar', () => {
      const updateOrganizationSuccessSpy = spyOn(
        TestBed.get(SnackBarService),
        'updateOrganizationSuccess',
      );
      effects.updateOrganization$.subscribe(() => {
        expect(updateOrganizationSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('updateUser$', () => {
    it('should dispatch AuthActions.UpdateUser', (() => {
      const user = getMockUsers()[0];
      actions = hot('a', {
        a: new SettingsActions.UpdateUser(user),
      });
      const expected = cold('b', {
        b: new AuthActions.UpdateUser(user),
      });
      expect(effects.updateUser$).toBeObservable(expected);
    }));

    it('should open the updateUserSuccess snackbar', () => {
      const updateUserSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateUserSuccess');
      effects.updateUser$.subscribe(() => {
        expect(updateUserSuccessSpy).toHaveBeenCalled();
      });
    });
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
