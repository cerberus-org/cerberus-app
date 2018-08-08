import { createSelector } from '@ngrx/store';
import { getSitesForSelectedTeam } from '../../core/selectors/sites.selectors';
import { getVisitsForSelectedTeam } from '../../core/selectors/visits.selectors';
import { getVolunteersForSelectedTeam } from '../../core/selectors/volunteers.selectors';
import { Site, Visit, Volunteer } from '../../shared/models';
import { VisitWithVolunteer } from '../models/visit-with-volunteer';

export const selectVisitWithVolunteers = createSelector(
  getVisitsForSelectedTeam,
  getVolunteersForSelectedTeam,
  getSitesForSelectedTeam,
  (visits: Visit[], volunteers: Volunteer[], sites: Site[]): VisitWithVolunteer[] =>
    visits.map(visit => ({
      ...visit,
      volunteer: volunteers.find(volunteer => volunteer.id === visit.volunteerId),
      selectedSite: sites.find(site => site.id === visit.siteId),
      teamSites: sites.filter(site => site.teamId === visit.teamId),
    })),
);
