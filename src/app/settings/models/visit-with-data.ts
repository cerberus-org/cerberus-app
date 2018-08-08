import { Site, Visit, Volunteer } from '../../shared/models';

export interface VisitWithData extends Visit {
  volunteer: Volunteer;
  site: Site;
}
