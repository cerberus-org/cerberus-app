import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { selectSessionOrganization, selectSessionUserInfo } from '../../auth/selectors/session.selectors';
import { getFormattedVisits, MEMBER_ROLE_OWNER } from '../../shared/helpers';
import { Member, Organization, Site, Visit, Volunteer } from '../../shared/models';
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

export const getModelSelectedTeamId = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): string => state.selectedTeamId,
);

export const getSelectedTeam = createSelector(
  selectModelOrganizations,
  getModelSelectedTeamId,
  (teams: Organization[], id: string): Organization => teams.find(team => team.id === id),
);

export const getMemberForSelectedTeam = createSelector(
  selectModelMembers,
  selectSessionUserInfo,
  getModelSelectedTeamId,
  (members: Member[], userInfo: UserInfo, teamId: string): Member =>
    members && userInfo && teamId
    && members.find(member => member.userUid === userInfo.uid && member.organizationId === teamId),
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
  selectModelSites,
  selectModelVisits,
  selectModelVolunteers,
  (
    userInfo: UserInfo,
    organization: Organization,
    sites: Site[],
    visits: Visit[],
    volunteers: Volunteer[],
  ): boolean => userInfo && organization && (sites === null || visits === null || volunteers === null),
);

export const selectModelLoadedState = createSelector(
  selectModelSites,
  selectModelVisits,
  selectModelVolunteers,
  (
    sites: Site[],
    visits: Visit[],
    volunteers: Volunteer[],
  ): boolean => sites !== null && visits !== null && volunteers !== null,
);
