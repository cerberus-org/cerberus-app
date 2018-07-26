import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import * as _ from 'lodash';
import { from } from 'rxjs';
import { MockErrorService } from '../../../mocks/classes/error.service.mock';
import { createMockVisits } from '../../../mocks/objects/visit.mock';
import { Visit } from '../../shared/models';
import { ErrorService } from '../../shared/services/error.service';
import { VisitService } from './visit.service';
import createSpy = jasmine.createSpy;

describe('VisitService', () => {
  let service: VisitService;
  let testVisit: Visit;
  // Declare spies here for access in specs, set during AngularFirestoreStub creation
  let endAtSpy;
  let orderBySpy;
  let snapshotChangesSpy;
  let startAtSpy;
  let valueChangesSpy;
  let whereSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        VisitService,
        { provide: AngularFirestore, useClass: AngularFirestoreStub },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(VisitService);
    testVisit = createMockVisits()[0];
  }));

  it('should be created', inject([VisitService], (visitService: VisitService) => {
    expect(visitService).toBeTruthy();
  }));

  it('should get visits by organizationId and date range and include IDs from the snapshots', () => {
    const startedAt = new Date('2017-06-03');
    const endedAt = new Date('2017-07-03');
    service.getByOrganizationIdAndDateRange(testVisit.organizationId, startedAt, endedAt, true)
      .subscribe((visits) => {
        const testVisits = createMockVisits();
        expect(snapshotChangesSpy).toHaveBeenCalled();
        expect(whereSpy).toHaveBeenCalledWith(
          'organizationId',
          '==',
          testVisit.organizationId,
        );
        expect(orderBySpy).toHaveBeenCalledWith('startedAt');
        expect(startAtSpy).toHaveBeenCalledWith(startedAt);
        expect(endAtSpy).toHaveBeenCalledWith(endedAt);
        expect(visits.length).toEqual(2);
        expect(visits[0]).toEqual(testVisits[0]);
        expect(visits[1]).toEqual(testVisits[1]);
      });
  });

  // TODO: Update using Firestore Timestamps for dates
  xit('should convert coming from the database', () => {
    testVisit.signature = JSON.stringify(testVisit.signature);
    const converted = service.mapDocToObject(testVisit);
    expect(converted.startedAt).toEqual(jasmine.any(Date));
    expect(converted.endedAt).toEqual(jasmine.any(Date));
    expect(converted.signature).toEqual(jasmine.any(Array));
  });

  it('should convert data going to the database', () => {
    const converted = service.mapObjectToDoc(testVisit);
    expect(converted.startedAt).toEqual(jasmine.any(Date));
    expect(converted.endedAt).toEqual(jasmine.any(Date));
    expect(converted.signature).toEqual(jasmine.any(String));
  });

  class AngularFirestoreStub {
    collection(path, queryFn) {
      let items = createMockVisits();
      // Run query function to call spies if provided
      if (queryFn) {
        queryFn({
          where: whereSpy = createSpy('where').and.callFake(function () {
            items = items.filter(item => item.organizationId === 'Ted');
            return this;
          }),
          orderBy: orderBySpy = createSpy('orderBy').and.callFake(function () {
            return this;
          }),
          startAt: startAtSpy = createSpy('startAt').and.callFake(function () {
            return this;
          }),
          endAt: endAtSpy = createSpy('endAt').and.callFake(function () {
            return this;
          }),
        });
      }
      return {
        valueChanges: valueChangesSpy = createSpy('valueChanges').and.callFake(
          () => from(items),
        ),
        snapshotChanges: snapshotChangesSpy = createSpy('snapshotChanges').and.callFake(
          () => from(items.map((item) => {
            const itemClone = _.cloneDeep(item);
            const id = itemClone.id;
            delete itemClone.id;
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
