import {createFeatureSelector, createSelector} from '@ngrx/store';
import {getFormattedVisits} from '../../../functions';
import {Organization, Site, User, Visit, Volunteer} from '../../../models';
import {ModelReducerState} from '../reducers/model.reducer';

export const selectModelReducerState = createFeatureSelector<ModelReducerState>('model');

export const selectModelOrganizations = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Organization[] => state.organizations,
);

export const selectModelSites = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Site[] => state.sites,
);

export const selectModelUsers = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): User[] => state.users,
);

export const selectModelVisits = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Visit[] => state.visits,
);

export const selectModelVolunteers = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Volunteer[] => state.volunteers,
);

export const selectVisitWithVolunteers = createSelector(
  selectModelVisits,
  selectModelVolunteers,
  (visits: Visit[], volunteers: Volunteer[]): VisitWithVolunteer[] =>
    visits.map(visit => ({
      ...visit,
      volunteer: volunteers.find(volunteer => volunteer.id === visit.volunteerId),
    })),
);

export interface VisitWithVolunteer extends Visit {
  volunteer: Volunteer;
}
