export class Report {
  start: string;
  end: string;
  period: string;
  title: string;
  description: string;
  open: boolean;

  constructor(start: string, end: string, period: string, title: string, description: string) {
    this.start = start;
    this.end = end;
    this.period = period;
    this.title = title;
    this.description = description;
  }
}

export class IndividualReport extends Report {
  volunteerName: string;

  constructor(start: string, end: string, period: string, title: string, description: string, volunteerName: string) {
    super(start, end, period, title, description);
    this.volunteerName = volunteerName;
  }
}
