export class Visit {
  _id: string;
  volunteerId: string;
  startedAt: Date;
  endedAt: Date;
  timezone: string;
  signature: any[];

  constructor(volunteerId: string, startedAt: Date, endedAt: Date, timezone: string, signature: any[]) {
    this.volunteerId = volunteerId;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.timezone = timezone;
    this.signature = signature;
  }
}

export const testVisits: Visit[] = [
  {
    _id: '674a861ace7ca574af9070c8',
    volunteerId: '5961327dfba1ca1b64b8945a',
    startedAt: new Date('2017-06-29T10:45:02.336Z'),
    endedAt: null,
    timezone: 'America/Chicago',
    signature: null
  },
  {
    _id: '674a861ace7ca574af9070c8',
    volunteerId: '5961327dfba1ca1b64b8945a',
    startedAt: new Date('2017-06-29T12:45:42.336Z'),
    endedAt: new Date('2017-06-29T18:45:01.336Z'),
    timezone: 'America/New_York',
    signature: null
  },
  {
    _id: '674a861ace7ca574af9070c8',
    volunteerId: '5961327dfba1ca1b64b8945a',
    startedAt: new Date('2017-06-30T12:45:42.336Z'),
    endedAt: new Date('2017-06-30T18:45:01.336Z'),
    timezone: 'America/Chicago',
    signature: null
  }
];
