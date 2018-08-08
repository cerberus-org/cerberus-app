import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfo } from 'firebase';
import { getUserInfo } from '../../auth/selectors/session.selectors';
import { MEMBER_ROLE_OWNER } from '../../shared/helpers';
import { Member, Team, Site, Visit, Volunteer } from '../../shared/models';
import { ModelReducerState } from '../reducers/model.reducer';

export const selectModelReducerState = createFeatureSelector<ModelReducerState>('model');

export const selectModelTeams = createSelector(
  selectModelReducerState,
  (state: ModelReducerState): Team[] => state.teams,
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
  selectModelTeams,
  getModelSelectedTeamId,
  (teams: Team[], id: string): Team => teams && teams.find(team => team.id === id),
);

export const getMemberForSelectedTeam = createSelector(
  selectModelMembers,
  getUserInfo,
  getModelSelectedTeamId,
  (members: Member[], userInfo: UserInfo, teamId: string): Member =>
    members && userInfo && teamId
    && members.find(member => member.userUid === userInfo.uid && member.teamId === teamId),
);

export const selectOwnerCount = createSelector(
  selectModelMembers,
  (members: Member[]): number => members.filter(member => member.role === MEMBER_ROLE_OWNER).length,
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
