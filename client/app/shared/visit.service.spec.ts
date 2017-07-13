///<reference path="../../../node_modules/@angular/http/testing/src/mock_backend.d.ts"/>
import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { VisitService } from './visit.service';
import { testVisits } from './visit';

describe('VisitService', () => {
  let backend: MockBackend = null;
  let service: VisitService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        VisitService,
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

  it('should be created', inject([VisitService], (VisitService: VisitService) => {
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

  it('should get all visits', () => {
    setConnections(testVisits);
    service.getAll().subscribe(res => {
      expect(res).toEqual(testVisits);
    });
  });

  it('should count all visits', () => {
    setConnections(testVisits.length);
    service.count().subscribe(res => {
      expect(res).toEqual(testVisits.length);
    });
  });

  it('should create the visit', () => {
    setConnections(testVisits[0]);
    service.create(testVisits[0]).subscribe(res => {
      expect(res).toEqual(JSON.stringify(testVisits[0]);
    });
  });

  it('should get the visit', () => {
    setConnections(testVisits[0]);
    service.get(testVisits[0]).subscribe(res => {
      expect(res).toEqual(testVisits[0]);
    });
  });

  it('should update the visit', () => {
    setConnections(testVisits[0]);
    service.update(testVisits[0]).subscribe(res => {
      expect(res).toEqual(testVisits[0]);
    });
  });

  it('should delete the visit', () => {
    setConnections(testVisits[0]);
    service.delete(testVisits[0]).subscribe(res => {
      expect(res).toEqual(testVisits[0]);
    });
  });
});
