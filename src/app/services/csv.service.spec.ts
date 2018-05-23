import { async, getTestBed, inject, TestBed } from '@angular/core/testing';

import { CsvService } from '.';

describe('CsvService', () => {
  let service: CsvService;
  let data: any[];
  let propertiesToColumnTitles: Map<string, string>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        CsvService,
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(CsvService);
    data = [{
      a: 'test1',
      b: 'test2',
      c: 'test3',
    }];
    propertiesToColumnTitles = new Map([
      ['a', 'A'],
      ['b', 'B'],
      ['c', 'C'],
    ]);
  }));

  it('should be created', inject([CsvService], (csvService: CsvService) => {
    expect(csvService).toBeTruthy();
  }));

  it('should convert an array of objects to a comma separated string ', () => {
    expect(service.covertToCommaSeparatedString(data, propertiesToColumnTitles))
      .toEqual('A,B,C,\r\ntest1,test2,test3,\r\n');
  });
});
