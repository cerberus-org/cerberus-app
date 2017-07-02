import { Component, OnInit } from '@angular/core';
import Visit from '../shared/visit';
import Volunteer from '../shared/volunteer';

@Component({
  selector: 'app-visit-history',
  templateUrl: './visit-history.component.html',
  styleUrls: ['./visit-history.component.css']
})
export class VisitHistoryComponent implements OnInit {
  public visits: Visit[];
  public visitsByDate: Map<string, Visit[]>;

  constructor() { }

  ngOnInit() {
    this.visits = this.getVisits();
    this.visitsByDate = this.mapVisitsToDate(this.visits);
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
      if (!(date in map)) {
        map.set(date, []);
      }
      map.get(date).push(visit);
    });
    return map;
  }

  calculateDuration(visit: Visit) {
    return visit.endedAt.getTime() - visit.startedAt.getTime();
  }

  formatDate(date: Date): string {
    return date.toDateString();
  }

  formatDuration(duration: number): string {
    // Convert to seconds
    let seconds = duration / 1000;
    // Extract hours
    const hours = Math.floor(seconds / 3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // Extract minutes
    const minutes = Math.floor(seconds / 60); // 60 seconds in 1 minute
    return `${hours} hours, ${minutes} minutes`;
  }

  /**
   * Display the date for each set of visits on that date
   * @param visit
   */
  displayDate(visit: Visit): boolean {
    return true;
  }
}
