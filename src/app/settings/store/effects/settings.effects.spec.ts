import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import * as SessionActions from '../../../auth/store/actions/session.actions';
import { authReducers } from '../../../auth/store/reducers';
import { getMockOrganizations } from '../../../mock/objects/organization.mock';
import { getMockUsers } from '../../../mock/objects/user.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { Organization, User } from '../../../models';
import { rootReducers } from '../../../root/store/reducers';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { CsvService } from '../../services/csv.service';
import * as SettingsActions from '../actions/settings.actions';
import { settingsReducer } from '../reducers/settings.reducer';
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
      imports: [
        StoreModule.forFeature('auth', authReducers),
        StoreModule.forRoot(rootReducers),
      ],
    });
    effects = TestBed.get(SettingsEffects);
  }));

  describe('updateOrganization$', () => {
    let organization: Organization;

    beforeEach(async(() => {
      organization = getMockOrganizations()[0];
      actions = hot('a', {
        a: new SettingsActions.UpdateOrganization(organization),
      });
    }));

    it('should dispatch SessionActions.UpdateOrganization', (() => {
      const expected = cold('b', {
        b: new SessionActions.UpdateOrganization(organization),
      });
      expect(effects.updateOrganization$).toBeObservable(expected);
    }));

    it('should open the updateOrganizationSuccess snackbar', () => {
      const updateOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateOrganizationSuccess');
      effects.updateOrganization$.subscribe(() => {
        expect(updateOrganizationSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('updateUser$', () => {
    let user: User;

    beforeEach(async(() => {
      user = getMockUsers()[0];
      actions = hot('a', {
        a: new SettingsActions.UpdateUser(user),
      });
    }));

    it('should dispatch SessionActions.UpdateUser', (() => {
      const expected = cold('b', {
        b: new SessionActions.UpdateUser(user),
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
    beforeEach(async(() => {
      actions = hot('a', {
        a: new SettingsActions.GenerateVisitHistoryReport({
          startedAt: new Date(),
          endedAt: new Date(),
        }),
      });
    }));

    it('should emit download csv, on success', (() => {
      const downloadCsvSpy = spyOn(TestBed.get(CsvService), 'downloadAsCsv');
      effects.generateVisitHistoryReport$.subscribe(() => {
        expect(downloadCsvSpy).toHaveBeenCalled();
      });
    }));
  });
});
