import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { OrganizationService } from './organization.service';
import { testOrganizations } from '../models/organization';

describe('OrganizationService', () => {
  let backend: MockBackend = null;
  let service: OrganizationService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        OrganizationService,
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
    service = testbed.get(OrganizationService);
  }));

  it('is created', inject([OrganizationService], (OrganizationService: OrganizationService) => {
    expect(OrganizationService).toBeTruthy();
  }));

  const setConnections = body => {
    backend.connections.subscribe(function (connection: MockConnection) {
      const options = new ResponseOptions({
        body: JSON.stringify(body)
      });
      connection.mockRespond(new Response(options));
    });
  };

  it('gets all organizations', () => {
    setConnections(testOrganizations);
    service.getAll().subscribe(res => {
      expect(res).toEqual(testOrganizations);
    });
  });

  it('counts all organizations', () => {
    setConnections(testOrganizations.length);
    service.count().subscribe(res => {
      expect(res).toEqual(testOrganizations.length);
    });
  });

  it('creates the organization', () => {
    setConnections(testOrganizations[0]);
    service.create(testOrganizations[0]).subscribe(res => {
      expect(res).toEqual(testOrganizations[0]);
    });
  });

  it('gets the organization', () => {
    setConnections(testOrganizations[0]);
    service.get(testOrganizations[0]).subscribe(res => {
      expect(res).toEqual(testOrganizations[0]);
    });
  });

  it('updates the organization', () => {
    setConnections(testOrganizations[0]);
    service.update(testOrganizations[0]).subscribe(res => {
      expect(res).toEqual(testOrganizations[0]);
    });
  });

  it('deletes the organization', () => {
    setConnections(testOrganizations[0]);
    service.delete(testOrganizations[0]).subscribe(res => {
      expect(res).toEqual(testOrganizations[0]);
    });
  });
});
