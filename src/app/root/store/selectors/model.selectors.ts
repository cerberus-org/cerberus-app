import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { selectSessionOrganization, selectSessionUserInfo } from '../../../auth/store/selectors/session.selectors';
import { getFormattedVisits, MEMBER_ROLE_OWNER } from '../../../functions';
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

export const selectFormattedModelVisits = createSelector(
  selectModelVisits,
  selectModelVolunteers,
  (visits: Visit[], volunteers: Volunteer[]): any[] => getFormattedVisits(visits, volunteers),
);

export const selectModelLoadingState = createSelector(
  selectSessionUserInfo,
  selectSessionOrganization,
  selectModelMembers,
  selectModelSites,
  selectModelVisits,
  selectModelVolunteers,
  (
    userInfo: UserInfo,
    organization: Organization,
    members: Member[],
    sites: Site[],
    visits: Visit[],
    volunteers: Volunteer[],
  ): boolean => {
    
  },
)
