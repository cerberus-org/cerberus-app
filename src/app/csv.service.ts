import { Injectable } from '@angular/core';
import { Visit } from './models/visit';
import { Volunteer } from './models/volunteer';

@Injectable()
export class CsvService {

  visitsWithNames: any[];

  constructor() { }

  mapVisitsToVolunteers(visits: Visit[], volunteers: Volunteer[]): any[] {
    // this.visitsWithNames = visits.filter(
    //   visit => volunteers.filter(
    //       volunteer => {
    //         if (visit.id === volunteer.id) {
    //           return  Object.assign({}, visit, { firstName: volunteer.firstName, lastName: volunteer.lastName });
    //         }
    //       }
    //   ));

    // visits.forEach(function (visit) {
    //   volunteers.forEach(function (volunteer) {
    //     if (visit.volunteerId === volunteer.id) {
    //       this.visitsWithNames.push(Object.assign({}, visit, { firstName: volunteer.firstName, lastName: volunteer.lastName }))
    //     }
    //   })
    // });

    this.visitsWithNames = [];
    let found = false;
    for (let i = 0, max = visits.length; i < max; i += 1) {
      for (let j = 0, maxA = volunteers.length; j < maxA; j += 1) {
        if (visits[i].volunteerId === volunteers[j].id) {
          found = true;
          this.visitsWithNames.push(Object.assign({}, visits[i], { firstName: volunteers[j].firstName, lastName: volunteers[j].lastName }))
        }
      }
      if (!found) {
        this.visitsWithNames.push(Object.assign({}, visits[i], { firstName: 'N/A', lastName: 'N/A' }));
      }
      found = false;
    }
    return this.visitsWithNames;
  }
}
