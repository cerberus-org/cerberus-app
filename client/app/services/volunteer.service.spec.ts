import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';

import { VolunteerService } from './volunteer.service';
import { testVolunteers } from '../models/volunteer';
import { volunteerReducer } from '../reducers/volunteer';
import ErrorService, { MockErrorService } from './error.service';

describe('VolunteerService', () => {
  let backend: MockBackend = null;
  let service: VolunteerService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({volunteers: volunteerReducer})
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        VolunteerService,
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
    service = testbed.get(VolunteerService);
  }));

  it('should be created', inject([VolunteerService], (volunteerService: VolunteerService) => {
    expect(volunteerService).toBeTruthy();
  }));

  const setConnections = body => {
    backend.connections.subscribe((connection: MockConnection) => {
      const options = new ResponseOptions({
        body: JSON.stringify(body)
      });
      connection.mockRespond(new Response(options));
    });
  };

  it('gets all volunteers', () => {
    setConnections(testVolunteers);
    service.getAll().subscribe(res => {
      expect(res).toEqual(testVolunteers);
    });
  });

  it('counts all volunteers', () => {
    setConnections(testVolunteers.length);
    service.count().subscribe(res => {
      expect(res).toEqual(testVolunteers.length);
    });
  });

  it('creates the volunteer', () => {
    setConnections(testVolunteers[0]);
    service.create(testVolunteers[0]).subscribe(res => {
      expect(res).toEqual(testVolunteers[0]);
    });
  });

  it('gets the volunteer', () => {
    setConnections(testVolunteers[0]);
    service.get(testVolunteers[0]).subscribe(res => {
      expect(res).toEqual(testVolunteers[0]);
    });
  });

  it('updates the volunteer', () => {
    setConnections(testVolunteers[0]);
    service.update(testVolunteers[0]).subscribe(res => {
      expect(res).toEqual(testVolunteers[0]);
    });
  });

  it('deletes the volunteer', () => {
    setConnections(testVolunteers[0]);
    service.delete(testVolunteers[0]).subscribe(res => {
      expect(res).toEqual(testVolunteers[0]);
    });
  });
});
