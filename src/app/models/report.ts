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
