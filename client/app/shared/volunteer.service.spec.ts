import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { VolunteerService } from './volunteer.service';
import { testVolunteers } from './volunteer';

describe('VolunteerService', () => {
  let backend: MockBackend = null;
  let service: VolunteerService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        VolunteerService,
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

  it('should get all volunteers', () => {
    setConnections(testVolunteers);
    service.getAll().subscribe(res => {
      expect(res).toEqual(testVolunteers);
    });
  });

  it('should count all volunteers', () => {
    setConnections(testVolunteers.length);
    service.count().subscribe(res => {
      expect(res).toEqual(testVolunteers.length);
    });
  });

  it('should create the volunteer', () => {
    setConnections(testVolunteers[0]);
    service.create(testVolunteers[0]).subscribe(res => {
      expect(res).toEqual(testVolunteers[0]);
    });
  });

  it('should get the volunteer', () => {
    setConnections(testVolunteers[0]);
    service.get(testVolunteers[0]).subscribe(res => {
      expect(res).toEqual(testVolunteers[0]);
    });
  });

  it('should update the volunteer', () => {
    setConnections(testVolunteers[0]);
    service.update(testVolunteers[0]).subscribe(res => {
      expect(res).toEqual(testVolunteers[0]);
    });
  });

  it('should delete the volunteer', () => {
    setConnections(testVolunteers[0]);
    service.delete(testVolunteers[0]).subscribe(res => {
      expect(res).toEqual(testVolunteers[0]);
    });
  });
});
