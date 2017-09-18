import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { VisitService } from './visit.service';
import { testVisits } from '../models/visit';
import { StoreModule } from '@ngrx/store';
import { visitReducer } from '../reducers/visit';
import { ErrorService, MockErrorService } from './error.service';

describe('VisitService', () => {
  let backend: MockBackend = null;
  let service: VisitService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({ visits: visitReducer })
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        VisitService,
        { provide: ErrorService, useClass: MockErrorService },
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(VisitService);
  }));

  it('is created', inject([VisitService], (VisitService: VisitService) => {
    expect(VisitService).toBeTruthy();
  }));

  const setConnections = body => {
    backend.connections.subscribe(function (connection: MockConnection) {
      const options = new ResponseOptions({
        body: JSON.stringify(body)
      });
      connection.mockRespond(new Response(options));
    });
  };

  it('gets all visits', () => {
    setConnections(testVisits);
    service.getAll().subscribe(res => {
      expect(res).toEqual(testVisits);
    });
  });

  it('counts all visits', () => {
    setConnections(testVisits.length);
    service.count().subscribe(res => {
      expect(res).toEqual(testVisits.length);
    });
  });

  it('creates the visit', () => {
    setConnections(testVisits[0]);
    service.create(testVisits[0]).subscribe(res => {
      expect(res).toEqual(testVisits[0]);
    });
  });

  it('gets the visit', () => {
    setConnections(testVisits[0]);
    service.get(testVisits[0]).subscribe(res => {
      expect(res).toEqual(testVisits[0]);
    });
  });

  it('updates the visit', () => {
    setConnections(testVisits[0]);
    service.update(testVisits[0]).subscribe(res => {
      expect(res).toEqual(testVisits[0]);
    });
  });

  it('deletes the visit', () => {
    setConnections(testVisits[0]);
    service.delete(testVisits[0]).subscribe(res => {
      expect(res).toEqual(testVisits[0]);
    });
  });
});
