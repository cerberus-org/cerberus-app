import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { StoreModule } from '@ngrx/store';

import { LocationService } from './location.service';
import { testLocations } from '../models/location';
import { locationReducer } from '../reducers/locations.reducer';
import { ErrorService, MockErrorService } from './error.service';

describe('LocationService', () => {
  let backend: MockBackend = null;
  let service: LocationService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.provideStore({locations: locationReducer})
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        LocationService,
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
    service = testbed.get(LocationService);
  }));

  it('is created', inject([LocationService], (LocationService: LocationService) => {
    expect(LocationService).toBeTruthy();
  }));

  const setConnections = body => {
    backend.connections.subscribe(function (connection: MockConnection) {
      const options = new ResponseOptions({
        body: JSON.stringify(body)
      });
      connection.mockRespond(new Response(options));
    });
  };

  it('gets all locations', () => {
    setConnections(testLocations);
    service.getAll().subscribe(res => {
      expect(res).toEqual(testLocations);
    });
  });

  it('counts all locations', () => {
    setConnections(testLocations.length);
    service.count().subscribe(res => {
      expect(res).toEqual(testLocations.length);
    });
  });

  it('creates the location', () => {
    setConnections(testLocations[0]);
    service.create(testLocations[0]).subscribe(res => {
      expect(res).toEqual(testLocations[0]);
    });
  });

  it('gets the location', () => {
    setConnections(testLocations[0]);
    service.get(testLocations[0]).subscribe(res => {
      expect(res).toEqual(testLocations[0]);
    });
  });

  it('updates the location', () => {
    setConnections(testLocations[0]);
    service.update(testLocations[0]).subscribe(res => {
      expect(res).toEqual(testLocations[0]);
    });
  });

  it('deletes the location', () => {
    setConnections(testLocations[0]);
    service.delete(testLocations[0]).subscribe(res => {
      expect(res).toEqual(testLocations[0]);
    });
  });
});
