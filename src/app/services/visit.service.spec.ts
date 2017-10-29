import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { VisitService } from './visit.service';
import { ErrorService, MockErrorService } from './error.service';
import { testVisits, Visit } from '../models/visit';

describe('VisitService', () => {
  let service: VisitService;
  let visit: Visit;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        VisitService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService },
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(VisitService);
    visit = Object.assign({}, testVisits[0]);
  }));

  it('is created', inject([VisitService], (visitService: VisitService) => {
    expect(visitService).toBeTruthy();
  }));

  it('converts coming from the database', () => {
    visit.signature = JSON.stringify(visit.signature);
    const converted = service.convertIn(visit);
    expect(converted.startedAt).toEqual(jasmine.any(Date));
    expect(converted.endedAt).toEqual(jasmine.any(Date));
    expect(converted.signature).toEqual(jasmine.any(Array));
  });

  it('converts data going to the database', () => {
    const converted = service.convertOut(visit);
    expect(converted.startedAt).toEqual(jasmine.any(Date));
    expect(converted.endedAt).toEqual(jasmine.any(Date));
    expect(converted.signature).toEqual(jasmine.any(String));
  });
});
