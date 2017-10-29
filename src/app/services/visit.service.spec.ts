import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { VisitService } from './visit.service';
import { ErrorService, MockErrorService } from './error.service';

describe('VisitService', () => {
  let service: VisitService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule
      ],
      providers: [
        VisitService,
        { provide: ErrorService, useClass: MockErrorService },
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(VisitService);
  }));

  it('is created', inject([VisitService], (visitService: VisitService) => {
    expect(visitService).toBeTruthy();
  }));
});
