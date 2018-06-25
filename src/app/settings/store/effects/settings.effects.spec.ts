import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import * as SessionActions from '../../../auth/store/actions/session.actions';
import { authReducers } from '../../../auth/store/reducers';
import { initialSessionReducerState } from '../../../auth/store/reducers/session.reducer';
import { getMockOrganizations } from '../../../mock/objects/organization.mock';
import { getMockUsers } from '../../../mock/objects/user.mock';
import { getMockVolunteers } from '../../../mock/objects/volunteer.mock';
import { mockServiceProviders } from '../../../mock/providers.mock';
import { Organization, User, Volunteer } from '../../../models';
import { rootReducers } from '../../../root/store/reducers';
import { initialModelReducerState } from '../../../root/store/reducers/model.reducer';
import { SnackBarService } from '../../../shared/services/snack-bar.service';
import { CsvService } from '../../services/csv.service';
import * as SettingsActions from '../actions/settings.actions';
import { SettingsEffects } from './settings.effects';

describe('SettingsEffects', () => {
  let effects: SettingsEffects;
  let actions: Observable<any>;
  let modelVolunteers: Volunteer[];
  let sessionOrganization: Organization;
  let sessionUser: User;

  beforeEach(async(() => {
    actions = of('');
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions),
        ...mockServiceProviders,
      ],
      imports: [
        StoreModule.forRoot(rootReducers, {
          initialState: {
            model: {
              ...initialModelReducerState,
              volunteers: modelVolunteers = getMockVolunteers(),
            },
          },
        }),
        StoreModule.forFeature('auth', authReducers, {
          initialState: {
            session: {
              ...initialSessionReducerState,
              organization: sessionOrganization = getMockOrganizations()[0],
              user: sessionUser = getMockUsers()[0],
            },
          },
        }),
      ],
    });
    effects = TestBed.get(SettingsEffects);
  }));

  describe('updateOrganization$', () => {
    let organization: Organization;

    beforeEach(async(() => {
      organization = getMockOrganizations()[1];
      actions = hot('a', {
        a: new SettingsActions.UpdateOrganization(organization),
      });
    }));

    it('should dispatch SessionActions.UpdateOrganization', () => {
      const expected = cold('b', {
        b: new SessionActions.UpdateOrganization(organization),
      });
      expect(effects.updateOrganization$).toBeObservable(expected);
    });

    it('should open the updateOrganizationSuccess snackbar', () => {
      const updateOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateOrganizationSuccess');
      effects.updateOrganization$.subscribe(() => {
        expect(updateOrganizationSuccessSpy).toHaveBeenCalled();
      });
    });
  });

  describe('updateUser$', () => {

    beforeEach(async(() => {
      actions = hot('a', {
        a: new SettingsActions.UpdateUser({ ...getMockUsers()[1], role: undefined }),
      });
    }));

    it(
      'should dispatch SessionActions.UpdateUser with the edited user and without changes to the role property',
      (() => {
        const expected = cold('b', {
          b: new SessionActions.UpdateUser({ ...getMockUsers()[1], role: sessionUser.role }),
        });
        expect(effects.updateUser$).toBeObservable(expected);
      }),
    );

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
