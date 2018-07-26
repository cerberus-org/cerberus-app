export class Visit {
  id: string;
  organizationId: string;
  siteId: string;
  volunteerId: string;
  startedAt: Date;
  endedAt: Date;
  timezone: string;
  signature: any;

  constructor(
    siteId: string,
    volunteerId: string,
    startedAt: Date,
    endedAt: Date,
    timezone: string,
    signature: any,
  ) {
    this.siteId = siteId;
    this.volunteerId = volunteerId;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.timezone = timezone;
    this.signature = signature;
  }
}
