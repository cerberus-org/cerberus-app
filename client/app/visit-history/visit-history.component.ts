import { Component, OnInit } from '@angular/core';
import Visit from '../shared/visit';
import Volunteer from '../shared/volunteer';

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
    const testVolunteer: Volunteer = {
      firstName: 'Ted',
      lastName: 'Mader',
      petName: 'Mimi'
    };
    return [
      {
        volunteer: testVolunteer,
        startedAt: new Date('2017-06-29T10:45:02.336Z'),
        endedAt: new Date('2017-06-29T16:45:56.336Z')
      },
      {
        volunteer: testVolunteer,
        startedAt: new Date('2017-06-29T12:45:42.336Z'),
        endedAt: new Date('2017-06-29T18:45:01.336Z')
      },
      {
        volunteer: testVolunteer,
        startedAt: new Date('2017-06-30T12:45:32.336Z'),
        endedAt: new Date('2017-06-30T18:45:52.336Z')
      }
    ];
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
