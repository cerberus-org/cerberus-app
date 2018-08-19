import { createSelector } from '@ngrx/store';
import { getSiteEntities } from '../../core/selectors/sites.selectors';
import { getVisitsForSelectedTeam } from '../../core/selectors/visits.selectors';
import { getVolunteerEntities } from '../../core/selectors/volunteers.selectors';
import { VisitsTableRow } from '../models/visits-table-row';

export const getVisitsTableRows = createSelector(
  getVisitsForSelectedTeam,
  getVolunteerEntities,
  getSiteEntities,
  (visits, volunteers, sites): VisitsTableRow[] =>
    visits.map(visit => ({
      ...visit,
      volunteer: volunteers[visit.volunteerId],
      site: sites[visit.siteId],
    })),
);
