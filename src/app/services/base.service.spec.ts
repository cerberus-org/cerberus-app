import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { testVolunteers } from '../models';

import { BaseService } from './base.service';
import { ErrorService, MockErrorService } from './error.service';
import 'rxjs/add/operator/map';

describe('BaseService', () => {
  let service: BaseService<any> = null;

  class AngularFirestoreStub {
    collection(someString) {
      return {
        valueChanges: () => Observable.from(testVolunteers.slice()),
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

  it('should get value changes from a collection', () => {
    service.getAll().subscribe((data) => {
      expect(data).toEqual(testVolunteers);
    });
  });

  xit('should get snapshot changes from a collection', () => {
    spyOn<any>(service.collection, 'valueChanges').and.returnValue(
      Observable.from(testVolunteers.slice()),
    );
    service.getAll(true).map((data) => {
      expect(data).toEqual(testVolunteers);
    });
  });
});
