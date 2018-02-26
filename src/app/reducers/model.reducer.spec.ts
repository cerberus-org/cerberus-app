import * as ModelActions from '../actions/model.actions';
import { sortVisitsByDate } from '../functions/helpers.functions';
import { testSites, testVisits, testVolunteers } from '../models';
import * as fromModel from './model.reducer';

describe('modelReducer', () => {
  describe('LOAD_SITES_SUCCESS', () => {
    it('sets the sites', () => {
      const state = fromModel.reducer(
        fromModel.initialState,
        new ModelActions.LoadSitesSuccess(testSites),
      );
      expect(state.sites).toEqual(testSites);
    });
  });

  describe('LOAD_VISITS_SUCCESS', () => {
    it('sets the visits, sorted by date', () => {
      const state = fromModel.reducer(
        fromModel.initialState,
        new ModelActions.LoadVisitsSuccess(testVisits),
      );
      expect(state.visits).toEqual(sortVisitsByDate(testVisits));
    });
  });

  describe('LOAD_VOLUNTEERS_SUCCESS', () => {
    it('sets the volunteers', () => {
      const state = fromModel.reducer(
        fromModel.initialState,
        new ModelActions.LoadVolunteersSuccess(testVolunteers),
      );
      expect(state.volunteers).toEqual(testVolunteers);
    });
  });
});
