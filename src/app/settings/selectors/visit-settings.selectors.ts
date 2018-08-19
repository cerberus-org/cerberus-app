import { createSelector } from '@ngrx/store';
import { getSiteEntities } from '../../core/selectors/sites.selectors';
import { getVisitsForSelectedTeam } from '../../core/selectors/visits.selectors';
import { getVolunteerEntities } from '../../core/selectors/volunteers.selectors';
import { VisitTableRow } from '../models/visit-table-row';

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
