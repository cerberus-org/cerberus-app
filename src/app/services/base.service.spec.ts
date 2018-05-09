import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { testVolunteers } from '../models';

import { BaseService } from './base.service';
import { ErrorService, MockErrorService } from './error.service';
import createSpy = jasmine.createSpy;

describe('BaseService', () => {
  let service: BaseService<any> = null;
  let docSpy;
  let addSpy;
  let deleteSpy;
  let getSpy;
  let setSpy;
  let orderBySpy;
  let updateSpy;
  let whereSpy;

  beforeEach(() => {
    class AngularFirestoreStub {
      collection(path, queryFn) {
        let items = testVolunteers.slice();
        const ref = {
          get: getSpy = createSpy('get').and.callFake(id => (
            Promise.resolve({
              id,
              data: () => items.find(item => item.id === id),
            })),
          ),
          where: whereSpy = createSpy('where').and.callFake(function () {
            items = items.filter(item => item.firstName === 'Ted');
            return this;
          }),
          orderBy: orderBySpy = createSpy('orderBy').and.callFake(function () {
            return this;
          }),
        };
        // Run query function to call spies if provided
        if (queryFn) {
          queryFn(ref);
        }
        return {
          add: addSpy = createSpy('add').and.callFake(() => (
            Promise.resolve(ref)),
          ),
          doc: docSpy = createSpy('doc').and.callFake(id => ({
            ref: {
              get: () => ref.get(id),
            },
            set: setSpy = createSpy('set').and.callFake(item => (
              Promise.resolve(Object.assign({}, item, id))
            )),
            delete: deleteSpy = createSpy('delete').and.callFake(() => (
              Promise.resolve(Observable.empty<any>())
            )),
            update: updateSpy = createSpy('update').and.callFake(() => (
              Promise.resolve(Observable.empty<any>())
            )),
          })),
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
      }
    }
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

  it('should get all data from a collection by a key and value using valueChanges', () => {
    const id = testVolunteers[0].id;
    service.getById(testVolunteers[0].id).subscribe((data) => {
      expect(data).toEqual(testVolunteers[0]);
    });
    expect(docSpy).toHaveBeenCalledWith(id);
    expect(getSpy).toHaveBeenCalled();
  });

  it('should get all data from a collection by a key and value using snapshotChanges', () => {
    const id = testVolunteers[0].id;
    service.getById(testVolunteers[0].id).subscribe((data) => {
      expect(data).toEqual(testVolunteers[0]);
    });
    expect(docSpy).toHaveBeenCalledWith(id);
    expect(getSpy).toHaveBeenCalled();
  });
});
