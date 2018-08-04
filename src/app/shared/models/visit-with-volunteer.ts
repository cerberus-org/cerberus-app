import { Site } from './site';
import { Volunteer } from './volunteer';

export class VisitWithVolunteer {
  id: string;
  organizationId: string;
  siteId: string;
  volunteerId: string;
  startedAt: Date;
  endedAt: Date;
  timezone: string;
  signature: any;
  volunteer: Volunteer;
  organizationSites: Site[];
  selectedSite: Site;

  constructor(
    siteId: string,
    volunteerId: string,
    startedAt: Date,
    endedAt: Date,
    timezone: string,
    signature: any,
    volunteer: Volunteer,
    organizationSites: Site[],
    selectedSite: Site,
  ) {
    this.siteId = siteId;
    this.volunteerId = volunteerId;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.timezone = timezone;
    this.signature = signature;
    this.volunteer = volunteer;
    this.organizationSites = organizationSites;
    this.selectedSite = selectedSite;
  }
}
