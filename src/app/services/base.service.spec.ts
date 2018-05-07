import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { testVolunteers } from '../models';

import { BaseService } from './base.service';
import { ErrorService, MockErrorService } from './error.service';

describe('BaseService', () => {
  let service: BaseService<any> = null;

  class AngularFirestoreStub {
    collection(someString) {
      return {
        valueChanges: () => Observable.from(testVolunteers.slice()),
        snapshotChanges: () => Observable.from(testVolunteers.slice()
          .map((item) => {
            const id = item.id;
            delete item.id;
            return {
              payload: {
                doc: {
                  id,
                  data: () => item,
                },
              },
            };
          })),
      };
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseService,
        { provide: AngularFirestore, useClass: AngularFirestoreStub },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(BaseService);
  });

  it('should be created', inject([BaseService], (baseService: BaseService<any>) => {
    expect(baseService).toBeTruthy();
  }));

  it('should get all data from a collection using valueChanges', () => {
    service.getAll().subscribe((data) => {
      expect(data).toEqual(testVolunteers);
    });
  });

  it('should get all data from a collection using snapshotChanges', () => {
    service.getAll(true).map((data) => {
      expect(data).toEqual(testVolunteers);
    });
  });
});
