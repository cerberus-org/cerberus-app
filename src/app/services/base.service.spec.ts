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
  let valueChangesSpy;
  let snapshotChangesSpy;
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
          valueChanges: valueChangesSpy = createSpy('valueChanges').and.callFake(
            () => Observable.from(items),
          ),
          snapshotChanges: snapshotChangesSpy = createSpy('valueChanges').and.callFake(
            () => Observable.from(items.map((item) => {
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
          ),
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

  describe('getAll', () => {
    it('should get all data from a collection', () => {
      service.getAll(false).subscribe((data) => {
        expect(data).toEqual(testVolunteers);
      });
      expect(valueChangesSpy).toHaveBeenCalled();
    });

    it('should get all data from a collection and include IDs from the snapshots', () => {
      service.getAll(true).subscribe((data) => {
        expect(data).toEqual(testVolunteers);
      });
      expect(snapshotChangesSpy).toHaveBeenCalled();
    });
  });

  describe('getByKey', () => {
    it('should get data from a collection by a key and value pair', () => {
      const key = 'firstName';
      const value = 'Ted';
      service.getByKey('firstName', 'Ted', false).subscribe((data) => {
        expect(data).toEqual(testVolunteers.filter(item => item.firstName === 'Ted'));
      });
      expect(valueChangesSpy).toHaveBeenCalled();
      expect(whereSpy).toHaveBeenCalledWith(key, '==', value);
    });

    it('should get data from a collection by a key and value pair and include IDs from the snapshots', () => {
      const key = 'firstName';
      const value = 'Ted';
      service.getByKey('firstName', 'Ted', true).subscribe((data) => {
        expect(data).toEqual(testVolunteers.filter(item => item.firstName === 'Ted'));
      });
      expect(snapshotChangesSpy).toHaveBeenCalled();
      expect(whereSpy).toHaveBeenCalledWith(key, '==', value);
    });
  });

  describe('getById', () => {
    it('should get data from a collection by ID and include the id from the snapshot', () => {
      const id = testVolunteers[0].id;
      service.getById(testVolunteers[0].id).subscribe((data) => {
        expect(data).toEqual(testVolunteers[0]);
      });
      expect(docSpy).toHaveBeenCalledWith(id);
      expect(getSpy).toHaveBeenCalled();
    });
  });
});
