import { Injectable } from '@angular/core';

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
    // Set column titles
    propertiesToColumnTitles.forEach((value: string, key: string) => {
      str += value + ',';
    });
    str += newRow;
    // Add data
    data.forEach((object) => {
      propertiesToColumnTitles.forEach((value: string, key: string) => {
        Object.keys(object).forEach((field) => {
          if (key === field) {
            str += object[field] + ',';
          }
        });
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
