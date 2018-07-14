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

  constructor(
    siteId: string,
    volunteerId: string,
    startedAt: Date,
    endedAt: Date,
    timezone: string,
    signature: any,
    volunteer: Volunteer,
  ) {
    this.siteId = siteId;
    this.volunteerId = volunteerId;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.timezone = timezone;
    this.signature = signature;
    this.volunteer = volunteer;
  }
}
