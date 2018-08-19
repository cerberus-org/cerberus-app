import { Dictionary } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  getMemberForCurrentUserAndSelectedTeam,
  getMembersForSelectedTeam,
  getOwnerCount,
} from '../../core/selectors/members.selectors';
import { getSiteEntities } from '../../core/selectors/sites.selectors';
import { getUserEntities } from '../../core/selectors/users.selectors';
import { getVisitsForSelectedTeam } from '../../core/selectors/visits.selectors';
import { getVolunteerEntities } from '../../core/selectors/volunteers.selectors';
import { getRoleOptions } from '../../shared/helpers';
import { Member, User } from '../../shared/models';
import { MemberTableRow } from '../models/member-table-row';
import { VisitTableRow } from '../models/visit-table-row';
import { SettingsState } from '../reducers';
import { SettingsReducerState } from '../reducers/settings.reducer';

export const getSettingsState = createFeatureSelector<SettingsState>('settingsModule');

export const getSettingsReducerState = createSelector(
  getSettingsState,
  (state: SettingsState) => state.settings,
);

export const getSelectedSettingsOption = createSelector(
  getSettingsReducerState,
  (state: SettingsReducerState) => state.selectedOption,
);

export const getMemberTableRows = createSelector(
  getMemberForCurrentUserAndSelectedTeam,
  getMembersForSelectedTeam,
  getUserEntities,
  getOwnerCount,
  (
    sessionMember: Member,
    modelMembers: Member[],
    userEntities: Dictionary<User>,
    ownerCount: number,
  ): MemberTableRow[] =>
    modelMembers && modelMembers.map(member => ({
      member,
      user: userEntities[member.userId],
      roleOptions: getRoleOptions(sessionMember, member, ownerCount === 1),
    })),
);

export const getVisitTableRows = createSelector(
  getVisitsForSelectedTeam,
  getVolunteerEntities,
  getSiteEntities,
  (visits, volunteers, sites): VisitTableRow[] =>
    visits.map(visit => ({
      ...visit,
      volunteer: volunteers[visit.volunteerId],
      site: sites[visit.siteId],
    })),
);
