export class Report {
  startedAt: Date;
  endedAt: Date;
  title: string;

  constructor(startedAt: Date, endedAt: Date, title: string) {
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.title = title;
  }
}

export const testReports: Report[] = [
  {
    startedAt: new Date('October 13, 2014 11:13:00'),
    endedAt: new Date(),
    title: 'Visit History'
  },
  {
    startedAt: new Date('April 10, 2013 11:13:00'),
    endedAt: new Date(),
    title: 'Def'
  }
];
