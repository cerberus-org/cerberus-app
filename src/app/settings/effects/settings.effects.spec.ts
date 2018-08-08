import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { createMockSites } from '../../../mocks/objects/site.mock';
import { createMockTeams } from '../../../mocks/objects/team.mock';
import { mockProviders } from '../../../mocks/providers.mock';
import { mockStoreModules } from '../../../mocks/store.mock';
import { SnackBarService } from '../../core/services/snack-bar.service';
import { Team } from '../../shared/models';
import { CreateSite, GenerateReport, UpdateTeam } from '../actions/settings.actions';
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

  describe('updateTeam$', () => {
    let team: Team;

    beforeEach(async(() => {
      team = createMockTeams()[1];
      actions = hot('a', {
        a: new UpdateTeam({ team }),
      });
    }));

    it('should open the updateTeamSuccess snackbar', async(() => {
      const updateTeamSuccessSpy = spyOn(TestBed.get(SnackBarService), 'updateTeamSuccess');
      effects.updateTeam$.subscribe(() => {
        expect(updateTeamSuccessSpy).toHaveBeenCalled();
      });
    }));
  });

  describe('generateVisitHistoryReport$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new GenerateReport({
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

  describe('createSite$', () => {
    beforeEach(async(() => {
      actions = hot('a', {
        a: new CreateSite({ site: createMockSites()[0] }),
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
