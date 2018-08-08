import { async, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { mockSites } from '../../../mocks/objects/site.mock';
import { mockTeams } from '../../../mocks/objects/team.mock';
import { createMockVisits } from '../../../mocks/objects/visit.mock';
import { createMockVolunteers } from '../../../mocks/objects/volunteer.mock';
import { mockProviders } from '../../../mocks/providers.mock';
import { filterByTeamId } from '../../shared/helpers';
import * as ModelActions from '../actions/model.actions';
import { ModelEffects } from './model.effects';

describe('ModelEffects', () => {
  let effects: ModelEffects;
  let actions: Observable<any>;
  const teamId: string = mockTeams[0].id;

  beforeEach(async(() => {
    actions = of('');
    TestBed.configureTestingModule({
      providers: [
        ModelEffects,
        provideMockActions(() => actions),
        ...mockProviders,
      ],
    });
    effects = TestBed.get(ModelEffects);
  }));

  describe('loadSites$', () => {
    it('should dispatch SessionActions.LoadSitesSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadSites(teamId),
      });
      const expected = cold('b', {
        b: new ModelActions.LoadSitesSuccess(
          filterByTeamId(mockSites, teamId),
        ),
      });
      expect(effects.loadSites$).toBeObservable(expected);
    }));
  });

  describe('loadVisits$', () => {
    it('should dispatch SessionActions.LoadVisitsSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadVisits(teamId),
      });
      const expected = cold('b', {
        b: new ModelActions.LoadVisitsSuccess(
          filterByTeamId(createMockVisits(), teamId),
        ),
      });
      expect(effects.loadVisits$).toBeObservable(expected);
    }));
  });

  describe('loadVolunteers$', () => {
    it('should dispatch SessionActions.LoadVolunteersSuccess', (() => {
      actions = hot('a', {
        a: new ModelActions.LoadVolunteers(teamId),
      });
      const expected = cold('b', {
        b: new ModelActions.LoadVolunteersSuccess(
          filterByTeamId(createMockVolunteers(), teamId),
        ),
      });
      expect(effects.loadVolunteers$).toBeObservable(expected);
    }));
  });
});
