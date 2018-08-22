import { Site, Visit, Volunteer } from '../../shared/models';

export interface VisitTableRow extends Visit {
  volunteer: Volunteer;
  site: Site;
}
