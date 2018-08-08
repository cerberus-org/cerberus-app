import { createSelector } from '@ngrx/store';
import { getSiteEntities } from '../../core/selectors/sites.selectors';
import { getVisitsForSelectedTeam } from '../../core/selectors/visits.selectors';
import { getVolunteerEntities } from '../../core/selectors/volunteers.selectors';
import { VisitWithData } from '../models/visit-with-data';

export const selectVisitsWithAllData = createSelector(
  getVisitsForSelectedTeam,
  getVolunteerEntities,
  getSiteEntities,
  (visits, volunteers, sites): VisitWithData[] =>
    visits.map(visit => ({
      ...visit,
      volunteer: volunteers[visit.volunteerId],
      site: sites[visit.siteId],
    })),
);
