export class Visit {
  _id: string;
  volunteerId: string;
  startedAt: Date;
  endedAt: Date;
  timezone: string;

  constructor(volunteerId: string, startedAt: Date, endedAt: Date, timezone: string) {
    this.volunteerId = volunteerId;
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.timezone = timezone;
  }
}

export const testVisits: Visit[] = [
  {
    _id: '674a861ace7ca574af9070c8',
    volunteerId: '5955737c88a8dde94e2e2ed4',
    startedAt: new Date('2017-06-29T10:45:02.336Z'),
    endedAt: new Date('2017-06-29T16:45:56.336Z'),
    timezone: 'America/Chicago'
  },
  {
    _id: '674a861ace7ca574af9070c8',
    volunteerId: '5955737c88a8dde94e2e2ed4',
    startedAt: new Date('2017-06-29T12:45:42.336Z'),
    endedAt: new Date('2017-06-29T18:45:01.336Z'),
    timezone: 'America/New_York'
  },
  {
    _id: '674a861ace7ca574af9070c8',
    volunteerId: '5955737c88a8dde94e2e2ed4',
    startedAt: new Date('2017-06-30T12:45:42.336Z'),
    endedAt: new Date('2017-06-30T18:45:01.336Z'),
    timezone: 'America/Chicago'
  }
];
