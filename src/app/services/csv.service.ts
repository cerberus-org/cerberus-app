import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { testVisits, Visit } from '../models/visit';

@Injectable()
export class CsvService {

  constructor() {}

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

export class MockCsvService extends CsvService {

  constructor() {
    super();
  }

  downloadAsCsv(): void {}

  covertToCommaSeparatedString(data: any[], propertiesToColumnTitles: Map<string, string>): string {
    return 'a, b, c';
  }
}
