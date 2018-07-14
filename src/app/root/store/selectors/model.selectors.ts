import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MEMBER_ROLE_OWNER } from '../../../functions';
import { Member, Organization, Site, Visit, Volunteer } from '../../../models';
import { ModelReducerState } from '../reducers/model.reducer';

export const selectModelReducerState = createFeatureSelector<ModelReducerState>('model');

export const selectModelOrganizations = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Organization[] => state.organizations,
);

export const selectModelSites = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Site[] => state.sites,
);

export const selectModelMembers = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Member[] => state.members,
);

export const selectModelVisits = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Visit[] => state.visits,
);

export const selectModelVolunteers = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Volunteer[] => state.volunteers,
);

export const selectOwnerCount = createSelector(
  selectModelMembers,
  (members: Member[]): number => members.filter(member => member.role === MEMBER_ROLE_OWNER).length,
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
