import { Site } from '../../shared/models/site';
import { Volunteer } from '../../shared/models/volunteer';

export interface VisitWithVolunteer {
  id: string;
  teamId: string;
  siteId: string;
  volunteerId: string;
  startedAt: Date;
  endedAt: Date;
  timezone: string;
  signature: any;
  volunteer: Volunteer;
  teamSites: Site[];
  selectedSite: Site;
}
