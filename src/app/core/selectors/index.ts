import { createSelector } from '@ngrx/store';
import { getMembersForUser } from './members.selectors';
import { getTeamEntities } from './teams.selectors';

export const getTeamsForUser = createSelector(
  getTeamEntities,
  getMembersForUser,
  (teamEntities, members) => members
    .map(member => teamEntities[member.teamId])
    .filter(team => !!team),
);
