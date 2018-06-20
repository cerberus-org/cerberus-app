import { getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { empty, from } from 'rxjs';
import { getTestVolunteers } from '../models';
import { BaseService } from './base.service';
import { ErrorService, MockErrorService } from './error.service';
import createSpy = jasmine.createSpy;

describe('BaseService', () => {
  let service: BaseService<any> = null;
  let testVolunteers;
  // Declare spies here for access in specs, set during AngularFirestoreStub creation
  let addSpy;
  let addGetSpy;
  let deleteSpy;
  let docSpy;
  let docGetSpy;
  let orderBySpy;
  let setSpy;
  let snapshotChangesSpy;
  let updateSpy;
  let valueChangesSpy;
  let whereSpy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseService,
        { provide: AngularFireAuth, useValue: null },
        { provide: AngularFirestore, useClass: AngularFirestoreStub },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(BaseService);
    testVolunteers = getTestVolunteers();
  });

  it('should be created', inject([BaseService], (baseService: BaseService<any>) => {
    expect(baseService).toBeTruthy();
  }));

  describe('getAll', () => {
    it('should get all data from a collection and include IDs from the snapshots', () => {
      service.getAll(true).subscribe((data) => {
        expect(snapshotChangesSpy).toHaveBeenCalled();
        expect(data).toEqual(testVolunteers);
      });
    });

    it('should get all data without IDs from a collection', () => {
      service.getAll(false).subscribe((data) => {
        expect(valueChangesSpy).toHaveBeenCalled();
        expect(data).toEqual(testVolunteers);
      });
    });

  });

  describe('getByKey', () => {
    it('should get data from a collection by a key and value pair and include IDs from the snapshots', () => {
      const key = 'firstName';
      const value = 'Ted';
      service.getByKey('firstName', 'Ted', true).subscribe((data) => {
        expect(snapshotChangesSpy).toHaveBeenCalled();
        expect(whereSpy).toHaveBeenCalledWith(key, '==', value);
        expect(data).toEqual(testVolunteers.filter(item => item.firstName === 'Ted'));
      });
    });

    it('should get data without IDs from a collection by a key and value pair', () => {

      const key = 'firstName';
      const value = 'Ted';
      service.getByKey('firstName', 'Ted', false).subscribe((data) => {
        expect(valueChangesSpy).toHaveBeenCalled();
        expect(whereSpy).toHaveBeenCalledWith(key, '==', value);
        expect(data).toEqual(testVolunteers.filter(item => item.firstName === 'Ted'));
      });
    });
  });

  describe('getById', () => {
    it('should get data from a collection by ID and include the id from the snapshot', () => {
      const id = testVolunteers[0].id;
      service.getById(testVolunteers[0].id).subscribe((data) => {
        expect(docSpy).toHaveBeenCalledWith(id);
        expect(docGetSpy).toHaveBeenCalled();
        expect(data).toEqual(testVolunteers[0]);
      });
    });
  });

  describe('add', () => {
    it('should add data to a collection with a given ID', () => {
      const volunteer = _.cloneDeep(testVolunteers[0]);
      const id = volunteer.id;
      delete volunteer.id;
      service.add(volunteer, id).subscribe((data) => {
        expect(docSpy).toHaveBeenCalledWith(id);
        expect(setSpy).toHaveBeenCalledWith(volunteer);
        expect(data).toEqual(testVolunteers[0]);
      });
    });

    it('should add data to a collection without a given ID', () => {
      const volunteer = Object.assign({}, testVolunteers[0]);
      delete volunteer.id;
      service.add(volunteer).subscribe((data) => {
        expect(addSpy).toHaveBeenCalledWith(volunteer);
        expect(addGetSpy).toHaveBeenCalled();
        expect(data).toEqual(Object.assign({}, testVolunteers[0], { id: 'testId' }));
      });
    });
  });

  describe('update', () => {
    it('should get update data in a collection', () => {
      const volunteer = testVolunteers[0];
      service.update(volunteer);
      expect(docSpy).toHaveBeenCalledWith(volunteer.id);
      expect(updateSpy).toHaveBeenCalledWith(volunteer);
    });
  });

  describe('delete', () => {
    it('should delete data in a collection', () => {
      const volunteer = testVolunteers[0];
      service.delete(volunteer);
      expect(docSpy).toHaveBeenCalledWith(volunteer.id);
      expect(deleteSpy).toHaveBeenCalled();
    });
  });

  class AngularFirestoreStub {
    collection(path, queryFn) {
      let items = getTestVolunteers();
      // Run query function to call spies if provided
      if (queryFn) {
        queryFn({
          where: whereSpy = createSpy('where').and.callFake(function () {
            items = items.filter(item => item.firstName === 'Ted');
            return this;
          }),
          orderBy: orderBySpy = createSpy('orderBy').and.callFake(function () {
            return this;
          }),
        });
      }
      return {
        add: addSpy = createSpy('add').and.callFake(item => (
          Promise.resolve({
            get: addGetSpy = createSpy('get').and.callFake(() => Promise.resolve({
              id: 'testId',
              data: () => item,
            })),
          })
        )),
        doc: docSpy = createSpy('doc').and.callFake(id => ({
          ref: {
            get: docGetSpy = createSpy('get').and.callFake(() => Promise.resolve({
              id,
              data: () => items.find(item => item.id === id),
            })),
          },
          set: setSpy = createSpy('set').and.callFake(item => (
            Promise.resolve()
          )),
          delete: deleteSpy = createSpy('delete').and.callFake(() => (
            Promise.resolve(empty())
          )),
          update: updateSpy = createSpy('update').and.callFake(() => (
            Promise.resolve(empty())
          )),
        })),
        valueChanges: valueChangesSpy = createSpy('valueChanges').and.callFake(
          () => from(items),
        ),
        snapshotChanges: snapshotChangesSpy = createSpy('snapshotChanges').and.callFake(
          () => from(items.map((item) => {
            const itemCopy = Object.assign({}, item);
            const id = itemCopy.id;
            delete itemCopy.id;
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
});
