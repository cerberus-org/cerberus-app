import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { testVolunteers } from '../models';

import { BaseService } from './base.service';
import { ErrorService, MockErrorService } from './error.service';
import createSpy = jasmine.createSpy;

describe('BaseService', () => {
  let service: BaseService<any> = null;
  let angularFirestoreStub;
  let whereSpy;
  let orderBySpy;

  beforeEach(() => {
    angularFirestoreStub = {
      collection(path, queryFn) {
        let items = testVolunteers.slice();
        if (queryFn) {
          const ref = {
            where: whereSpy = createSpy('where').and.callFake(function () {
              items = items.filter(item => item.firstName === 'Ted');
              return this;
            }),
            orderBy: orderBySpy = createSpy('orderBy').and.callFake(function () {
              return this;
            }),
          };
          queryFn(ref);
        }
        return {
          ref: {
            where: whereSpy,
            orderBy: orderBySpy,
          },
          valueChanges: () => Observable.from(items),
          snapshotChanges: () => Observable.from(items.map((item) => {
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
      },
    };
    TestBed.configureTestingModule({
      providers: [
        BaseService,
        { provide: AngularFirestore, useValue: angularFirestoreStub },
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
    service.getAll(false).subscribe((data) => {
      expect(data).toEqual(testVolunteers);
    });
  });

  it('should get all data from a collection using snapshotChanges', () => {
    service.getAll(true).subscribe((data) => {
      expect(data).toEqual(testVolunteers);
    });
  });

  it('should get all data from a collection by a key and value using valueChanges', () => {
    const key = 'firstName';
    const value = 'Ted';
    service.getByKey('firstName', 'Ted', false).subscribe((data) => {
      expect(data).toEqual(testVolunteers.filter(item => item.firstName === 'Ted'));
    });
    expect(whereSpy).toHaveBeenCalledWith(key, '==', value);
  });

  it('should get all data from a collection by a key and value using snapshotChanges', () => {
    const key = 'firstName';
    const value = 'Ted';
    service.getByKey('firstName', 'Ted', true).subscribe((data) => {
      expect(data).toEqual(testVolunteers.filter(item => item.firstName === 'Ted'));
    });
    expect(whereSpy).toHaveBeenCalledWith(key, '==', value);
  });
});
