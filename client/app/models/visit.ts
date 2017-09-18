export class Visit {
  _id: string;
  organizationId: string;
  locationId: string;
  volunteerId: string;
  startedAt: Date;
  endedAt: Date;
  timezone: string;
  signature: any;

  constructor(organizationId: string, locationId: string, volunteerId: string,
              startedAt: Date, endedAt: Date, timezone: string, signature: any) {
    this.organizationId = organizationId;
    this.locationId = locationId;
    this.volunteerId = volunteerId;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.timezone = timezone;
    this.signature = signature;
  }
}

export const testVisits: Visit[] = [
  {
    _id: '674a861ace7ca574af9070c0',
    organizationId: '59a7055733bfe28af47cff40',
    locationId: '59bc1e7ad92a6ac6f6252bfa',
    volunteerId: '5961327dfba1ca1b64b8945a',
    startedAt: new Date('2017-06-29T10:45:02.336Z'),
    endedAt: new Date('2017-06-29T14:45:02.336Z'),
    timezone: 'America/Chicago',
    signature: null
  },
  {
    _id: '674a861ace7ca574af9070c1',
    organizationId: '59a7055733bfe28af47cff40',
    locationId: '59bc1e7ad92a6ac6f6252bfa',
    volunteerId: '5961327dfba1ca1b64b8945b',
    startedAt: new Date('2017-06-29T12:45:42.336Z'),
    endedAt: new Date('2017-06-29T18:45:01.336Z'),
    timezone: 'America/New_York',
    signature: null
  },
  {
    _id: '674a861ace7ca574af9070c2',
    organizationId: '59a7055733bfe28af47cff40',
    locationId: '59bc1e7ad92a6ac6f6252bfa',
    volunteerId: '5961327dfba1ca1b64b8945c',
    startedAt: new Date('2017-06-30T12:45:42.336Z'),
    endedAt: new Date('2017-06-30T18:45:01.336Z'),
    timezone: 'America/Chicago',
    signature: null
  },
  {
    _id: '674a861ace7ca574af9070c3',
    organizationId: '59a7055733bfe28af47cff40',
    locationId: '59bc1e7ad92a6ac6f6252bfa',
    volunteerId: '5961327dfba1ca1b64b8945a',
    startedAt: new Date('2017-07-01T14:45:42.336Z'),
    endedAt: null,
    timezone: 'America/Chicago',
    signature: null
  },
  {
    _id: '674a861ace7ca574af9070c4',
    organizationId: '59a7055733bfe28af47cff40',
    locationId: '59bc1e7ad92a6ac6f6252bfa',
    volunteerId: '5961327dfba1ca1b64b8945z',
    startedAt: new Date('2017-07-02T10:45:42.336Z'),
    endedAt: new Date('2017-07-02T23:45:01.336Z'),
    timezone: 'America/Chicago',
    signature: null
  }
];
