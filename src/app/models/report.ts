export class Report {
  start: string;
  end: string;
  period: string;
  title: string;

  constructor(start: string, end: string, period: string, title: string) {
    this.start = start;
    this.end = end;
    this.period = period;
    this.title = title;
  }
}
