import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';

import { SiteService } from './site.service';
import { ErrorService, MockErrorService } from './error.service';
import { testSites } from '../models/site';
import { reducers } from '../reducers/index';

describe('SiteService', () => {
  let backend: MockBackend = null;
  let service: SiteService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers)
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        SiteService,
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
    service = testbed.get(SiteService);
  }));

  it('is created', inject([SiteService], (siteService: SiteService) => {
    expect(siteService).toBeTruthy();
  }));

  const setConnections = body => {
    backend.connections.subscribe(function (connection: MockConnection) {
      const options = new ResponseOptions({
        body: JSON.stringify(body)
      });
      connection.mockRespond(new Response(options));
    });
  };

  it('gets all sites', () => {
    setConnections(testSites);
    service.getAll().subscribe(res => {
      expect(res).toEqual(testSites);
    });
  });

  it('counts all sites', () => {
    setConnections(testSites.length);
    service.count().subscribe(res => {
      expect(res).toEqual(testSites.length);
    });
  });

  it('creates the site', () => {
    setConnections(testSites[0]);
    service.create(testSites[0]).subscribe(res => {
      expect(res).toEqual(testSites[0]);
    });
  });

  it('gets the site', () => {
    setConnections(testSites[0]);
    service.getById(testSites[0]._id).subscribe(res => {
      expect(res).toEqual(testSites[0]);
    });
  });

  it('updates the site', () => {
    setConnections(testSites[0]);
    service.update(testSites[0]).subscribe(res => {
      expect(res).toEqual(testSites[0]);
    });
  });

  it('deletes the site', () => {
    setConnections(testSites[0]);
    service.delete(testSites[0]).subscribe(res => {
      expect(res).toEqual(testSites[0]);
    });
  });
});
