import { sortVisitsByStartedAt } from '../../../functions';
import { mockSites } from '../../../mock/objects/site.mock';
import { mockVisits } from '../../../mock/objects/visit.mock';
import { mockVolunteers } from '../../../mock/objects/volunteer.mock';
import * as ModelActions from '../actions/model.actions';
import { initialModelReducerState, modelReducer } from './model.reducer';

describe('modelReducer', () => {
  describe('LOAD_SITES_SUCCESS', () => {
    it('sets the sites', () => {
      const state = modelReducer(
        undefined,
        new ModelActions.LoadSitesSuccess(mockSites),
      );
      expect(state.sites).toEqual(mockSites);
    });
  });

  describe('LOAD_VISITS_SUCCESS', () => {
    it('sets the visits, sorted by date', () => {
      const state = modelReducer(
        undefined,
        new ModelActions.LoadVisitsSuccess(mockVisits),
      );
      expect(state.visits).toEqual(sortVisitsByStartedAt(mockVisits));
    });
  });

  describe('LOAD_VOLUNTEERS_SUCCESS', () => {
    it('sets the volunteers', () => {
      const state = modelReducer(
        undefined,
        new ModelActions.LoadVolunteersSuccess(mockVolunteers),
      );
      expect(state.volunteers).toEqual(mockVolunteers);
    });
  });
});
