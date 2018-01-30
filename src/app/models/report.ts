export class Report {
  startedAt: Date;
  endedAt: Date;
  period: string;
  title: string;

  constructor(startedAt: Date, endedAt: Date, period: string, title: string) {
    this.startedAt = startedAt;
    this.endedAt = endedAt;
    this.period = period;
    this.title = title;
  }
}

export const testReports: Report[] = [
  {
    startedAt: new Date(),
    endedAt: new Date(),
    period: 'Year',
    title: 'Abc'
  },
  {
    startedAt: new Date(),
    endedAt: new Date(),
    period: 'Month',
    title: 'Def'
  }
];
