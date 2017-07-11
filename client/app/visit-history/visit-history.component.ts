import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../shared/volunteer';
import { testVisits, Visit } from '../shared/visit';
import * as moment from 'moment-timezone';
import { VisitService } from '../shared/visit.service';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {
  public error: string;
  public visits: Visit[];
  public visitsByDate: Map<string, Visit[]>;
  public dates: string[];

  constructor(private visitService: VisitService) { }

  ngOnInit() {
    this.visits = [];
    this.getVisits();
  }

  getVisits(): void {
    this.visitService.getVisits().subscribe(
      visits => {
        this.visits = visits.map(visit => {
          return Object.assign({}, visit, {
            startedAt: new Date(visit.startedAt),
            endedAt: visit.endedAt ? new Date(visit.endedAt) : null
          });
        });
        this.mapVisitsToDate();
      },
      error => this.error = <any>error);
  }

  mapVisitsToDate() {
    const map = new Map<string, Visit[]>();
    this.visits.forEach(visit => {
      const date = visit.startedAt.toDateString();
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date).push(visit);
    });
    this.visitsByDate = map;
    this.dates = Array.from(this.visitsByDate.keys()).reverse();
  }

  formatTime(date: Date, timezone: string): string {
    const now = moment(date.getTime());
    return now.tz(timezone).format('h:mm a');
  }

  formatDuration(visit: Visit): string {
    if (!visit.endedAt) {
      return null;
    }
    const duration = visit.endedAt.getTime() - visit.startedAt.getTime();
    // Convert to seconds
    let seconds = duration / 1000;
    // Extract hours
    const hours = Math.floor(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // Extract minutes
    const minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute
    return `${hours} hours, ${minutes} minutes`;
  }
}
