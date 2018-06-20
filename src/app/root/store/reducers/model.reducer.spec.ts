import { sortVisitsByStartedAt } from '../../../functions';
import { mockSites } from '../../../mock/objects/site.mock';
import { mockVisits } from '../../../mock/objects/visit.mock';
import { mockVolunteers } from '../../../mock/objects/volunteer.mock';
import * as ModelActions from '../actions/model.actions';
import * as fromModel from './model.reducer';

describe('modelReducer', () => {
  describe('LOAD_SITES_SUCCESS', () => {
    it('sets the sites', () => {
      const state = fromModel.reducer(
        fromModel.initialState,
        new ModelActions.LoadSitesSuccess(mockSites),
      );
      expect(state.sites).toEqual(mockSites);
    });
  });

  describe('LOAD_VISITS_SUCCESS', () => {
    it('sets the visits, sorted by date', () => {
      const state = fromModel.reducer(
        fromModel.initialState,
        new ModelActions.LoadVisitsSuccess(mockVisits),
      );
      expect(state.visits).toEqual(sortVisitsByStartedAt(mockVisits));
    });
  });

  describe('LOAD_VOLUNTEERS_SUCCESS', () => {
    it('sets the volunteers', () => {
      const state = fromModel.reducer(
        fromModel.initialState,
        new ModelActions.LoadVolunteersSuccess(mockVolunteers),
      );
      expect(state.volunteers).toEqual(mockVolunteers);
    });
  });
});
