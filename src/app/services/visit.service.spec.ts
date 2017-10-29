import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';

import { VisitService } from './visit.service';
import { ErrorService, MockErrorService } from './error.service';
import { testVisits } from '../models/visit';
import { reducers } from '../reducers/index';

describe('VisitService', () => {
  let backend: MockBackend = null;
  let service: VisitService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers)
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

  it('is created', inject([VisitService], (visitService: VisitService) => {
    expect(visitService).toBeTruthy();
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

  it('gets the visit by ID', () => {
    setConnections(testVisits[0]);
    service.getById(testVisits[0].id).subscribe(res => {
      expect(res).toEqual(testVisits[0]);
    });
  });

  it('adds the visit', () => {
    setConnections(testVisits[0]);
    service.add(testVisits[0]).subscribe(res => {
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
