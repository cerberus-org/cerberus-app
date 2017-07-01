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

  constructor() { }

  ngOnInit() {
    this.visits = this.getVisits();
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
        startedAt: new Date('2017-06-29T12:45:02.336Z'),
        endedAt: new Date('2017-06-29T18:45:02.336Z')
      },
      {
        volunteer: testVolunteer,
        startedAt: new Date('2017-06-29T12:45:02.336Z'),
        endedAt: new Date('2017-06-29T18:45:02.336Z')
      },
      {
        volunteer: testVolunteer,
        startedAt: new Date('2017-06-29T12:45:02.336Z'),
        endedAt: new Date('2017-06-29T18:45:02.336Z')
      }
    ];
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
    const hours = seconds / 3600; // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // Extract minutes
    const minutes = seconds / 60; // 60 seconds in 1 minute
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
