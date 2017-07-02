import { testVolunteers, Volunteer } from './volunteer';

export class Visit {
  volunteer: Volunteer;
  startedAt: Date;
  endedAt: Date;
}

export const testVisits: Visit[] = [
  {
    volunteer: testVolunteers[0],
    startedAt: new Date('2017-06-29T10:45:02.336Z'),
    endedAt: new Date('2017-06-29T16:45:56.336Z')
  },
  {
    volunteer: testVolunteers[1],
    startedAt: new Date('2017-06-29T12:45:42.336Z'),
    endedAt: new Date('2017-06-29T18:45:01.336Z')
  },
  {
    volunteer: testVolunteers[0],
    startedAt: new Date('2017-06-30T12:45:32.336Z'),
    endedAt: new Date('2017-06-30T18:45:52.336Z')
  }
];
