import { createSelector } from '@ngrx/store';
import { selectModelSites, selectModelVisits, selectModelVolunteers } from '../../core/selectors/model.selectors';
import { Site, Visit, Volunteer } from '../../shared/models';
import { VisitWithVolunteer } from '../../shared/models/visit-with-volunteer';

export const selectVisitWithVolunteers = createSelector(
  selectModelVisits,
  selectModelVolunteers,
  selectModelSites,
  (visits: Visit[], volunteers: Volunteer[], sites: Site[]): VisitWithVolunteer[] =>
    visits.map(visit => ({
      ...visit,
      volunteer: volunteers.find(volunteer => volunteer.id === visit.volunteerId),
      selectedSite: sites.find(site => site.id === visit.siteId),
      organizationSites: sites.filter(site => site.organizationId === visit.organizationId),
    })),
);
