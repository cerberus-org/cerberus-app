import { createSelector } from '@ngrx/store';
import { selectModelVisits, selectModelVolunteers } from '../../core/selectors/model.selectors';
import { Visit, Volunteer } from '../../shared/models/index';
import { VisitWithVolunteer } from '../../shared/models/visit-with-volunteer';

export const selectVisitWithVolunteers = createSelector(
  selectModelVisits,
  selectModelVolunteers,
  (visits: Visit[], volunteers: Volunteer[]): VisitWithVolunteer[] =>
    visits.map(visit => ({
      ...visit,
      volunteer: volunteers.find(volunteer => volunteer.id === visit.volunteerId),
    })),
);
