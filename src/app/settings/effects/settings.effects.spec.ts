import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { createMockOrganizations } from '../../../mocks/objects/organization.mock';
import { createMockSites } from '../../../mocks/objects/site.mock';
import { createMockVisits } from '../../../mocks/objects/visit.mock';
import { mockProviders } from '../../../mocks/providers.mock';
import { mockStoreModules } from '../../../mocks/store.mock';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { Team } from '../../shared/models';
import * as SettingsActions from '../actions/settings.actions';
import { CsvService } from '../services/csv.service';
import { SettingsEffects } from './settings.effects';

xdescribe('SettingsEffects', () => {
  let effects: SettingsEffects;
  let actions: Observable<any>;

  beforeEach(async(() => {
    actions = of('');
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions),
        ...mockProviders,
      ],
      imports: [
        ...mockStoreModules,
      ],
    })
    ;
    effects = TestBed.get(SettingsEffects);
  }));

  describe('updateOrganization$', () => {
    let organization: Team;

    beforeEach(async(() => {
      organization = createMockOrganizations()[1];
      actions = hot('a', {
        a: new SettingsActions.UpdateOrganization(organization),
      });
    }));

    it('should open the updateOrganizationSuccess snackbar', async(() => {
      const updateOrganizationSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateOrganizationSuccess');
      effects.updateOrganization$.subscribe(() => {
        expect(updateOrganizationSuccessSpy).toHaveBeenCalled();
      });
    }));
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

    it('should emit download csv, on success', async(() => {
      const downloadCsvSpy = spyOn(TestBed.get(CsvService), 'downloadAsCsv');
      effects.generateVisitHistoryReport$.subscribe(() => {
        expect(downloadCsvSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('updateVisits$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new SettingsActions.UpdateVisits(createMockVisits()),
      });
    }));

    it('should open the updateVisitsSuccess snackbar', async(() => {
      const updateVisitsSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateVisitsSuccess');
      effects.updateVisits$.subscribe(() => {
        expect(updateVisitsSuccessSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('createSite$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new SettingsActions.CreateSite(createMockSites()[0]),
      });
    }));

    it('should open the createSiteSuccess snackbar', async(() => {
      const createSiteSuccessSpy = spyOn(TestBed.get(SnackBarService), 'createSiteSuccess');
      effects.createSite$.subscribe(() => {
        expect(createSiteSuccessSpy).toHaveBeenCalled();
      });
    }));
  });
});
