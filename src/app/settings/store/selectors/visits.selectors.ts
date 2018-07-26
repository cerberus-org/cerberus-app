import { createSelector } from '@ngrx/store';
import { Visit, Volunteer } from '../../../core/models';
import { VisitWithVolunteer } from '../../../core/models/visit-with-volunteer';
import {
  selectModelVisits,
  selectModelVolunteers,
} from '../../../root/store/selectors/model.selectors';

export const selectVisitWithVolunteers = createSelector(
  selectModelVisits,
  selectModelVolunteers,
  (visits: Visit[], volunteers: Volunteer[]): VisitWithVolunteer[] =>
    visits.map(visit => ({
      ...visit,
      volunteer: volunteers.find(volunteer => volunteer.id === visit.volunteerId),
    })),
);
