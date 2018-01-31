import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { formatDuration } from './functions/date-format';
import { Visit } from './models/visit';
import { Volunteer } from './models/volunteer';

@Injectable()
export class CsvService {

  constructor() {}

  /**
   * Return an array with visits and with the associated volunteer name and visit duration.
   * @param {Visit[]} visits
   * @param {Volunteer[]} volunteers
   * @returns {any[]}
   */
  mapVisitsToVolunteers(visits: Visit[], volunteers: Volunteer[]): any[] {
    let found = false;
    const volunteerHistory = [];
    for (const visit of visits) {
      for (const volunteer of volunteers) {
        if (visit.volunteerId === volunteer.id) {
          found = true;
          volunteerHistory.push(
            Object.assign({}, visit, { name: volunteer.firstName + ' ' + volunteer.lastName, duration: formatDuration(visit.startedAt, visit.endedAt, visit.timezone) })
          )
        }
      }
      if (!found) {
        volunteerHistory.push(Object.assign({}, visit, { name: 'Deleted Volunteer', duration: formatDuration(visit.startedAt, visit.endedAt, visit.timezone) }));
      }
      found = false;
    }
    return volunteerHistory;
  }

  /**
   * Retrieved from http://vteams.com/blog/using-angular2-to-convert-json-to-csv/
   * @param {any[]} data
   * @param {string} title
   * @param {Map<string, string>} propertiesToColumnTitles
   */
  downloadAsCsv(data: any[], title: string, propertiesToColumnTitles: Map<string, string>): void {
    const csvData = this.covertToCommaSeparatedString(data, propertiesToColumnTitles);
    const element = document.createElement('a');
    element.setAttribute('style', 'display:none;');
    document.body.appendChild(element);
    element.href = window.URL.createObjectURL(new Blob([csvData], { type: 'text/csv' }));
    element.download = title;
    element.click();
  }

  /**
   * Converts data[] to comma separated string.
   * @param {any[]} data
   * @param {Map<string, string>} propertiesToColumnTitles
   * @returns {string}
   */
  covertToCommaSeparatedString(data: any[], propertiesToColumnTitles: Map<string, string>): string {
    const newRow = '\r\n';
    let str = '';
    // Since the object properties that will be reached first are unknown,
    // loop through the first object and set the column titles
    // based on the order the desired properties are found
    if (data[0]) {
      Object.keys(data[0]).forEach(function (key) {
        if (propertiesToColumnTitles.has(key)) {
          str += propertiesToColumnTitles.get(key) + ',';
        }
      });
      str += newRow;
    }
    // Create comma separated string of data[]
    data.forEach(function (object) {
      Object.keys(object).forEach(function (key) {
        console.log(key);
        if (propertiesToColumnTitles.has(key)) {
          str += object[key] + ',';
        }
      });
      str += newRow;
    });
    return str;
  }
}
