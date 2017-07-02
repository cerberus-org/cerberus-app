import { Component, OnInit } from '@angular/core';
import { Volunteer } from '../shared/volunteer';
import { testVisits, Visit } from '../shared/visit';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {
  public visitsByDate: Map<string, Visit[]>;
  public dates: string[];

  constructor() { }

  ngOnInit() {
    this.visitsByDate = this.mapVisitsToDate(this.getVisits());
    this.dates = Array.from(this.visitsByDate.keys());
  }

  /**
   * Use mock data until API is built
   * @returns {[{volunteer: Volunteer, startedAt: Date, endedAt: Date}]}
   */
  getVisits(): Visit[] {
    return testVisits;
  }

  mapVisitsToDate(visits: Visit[]) {
    const map = new Map<string, Visit[]>();
    visits.forEach(visit => {
      const date = visit.startedAt.toDateString();
      if (!map.has(date)) {
        map.set(date, []);
      }
      map.get(date).push(visit);
    });
    return map;
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  formatDuration(visit: Visit): string {
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
