import { Injectable } from '@angular/core';
import { Visit } from './models/visit';
import { Volunteer } from './models/volunteer';

@Injectable()
export class CsvService {

  visitsWithNames: any[];

  constructor() { }

  mapVisitsToVolunteers(visits: Visit[], volunteers: Volunteer[]): any[] {
    this.visitsWithNames = visits.filter(
      visit => volunteers.filter(
          volunteer => {
            if (visit.id === volunteer.id) {
              return  Object.assign({}, visit, { firstName: volunteer.firstName, lastName: volunteer.lastName });
            }
          }
      ));
    return this.visitsWithNames;
  }
}
