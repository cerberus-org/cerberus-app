import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';

import { VolunteerService } from './volunteer.service';
import { ErrorService, MockErrorService } from './error.service';
import { testVolunteers } from '../models/volunteer';
import { reducers } from '../reducers/index';

describe('VolunteerService', () => {
  let backend: MockBackend = null;
  let service: VolunteerService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers)
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

  it('gets the volunteer by ID', () => {
    setConnections(testVolunteers[0]);
    service.getById(testVolunteers[0].id).subscribe(res => {
      expect(res).toEqual(testVolunteers[0]);
    });
  });

  it('adds the volunteer', () => {
    setConnections(testVolunteers[0]);
    service.add(testVolunteers[0]).subscribe(res => {
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
