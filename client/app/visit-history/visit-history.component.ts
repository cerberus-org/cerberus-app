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

}
