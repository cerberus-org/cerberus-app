import { Site, Visit, Volunteer } from '../../shared/models';

export interface VisitsTableRow extends Visit {
  volunteer: Volunteer;
  site: Site;
}
