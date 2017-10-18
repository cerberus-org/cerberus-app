import { async, getTestBed, inject, TestBed, } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { UserService } from './user.service';
import { ErrorService, MockErrorService } from './error.service';
import { testUsers } from '../models/user';
import { reducers } from '../reducers/index';

describe('UserService', () => {
  let backend: MockBackend = null;
  let service: UserService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers)
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        UserService,
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
    service = testbed.get(UserService);
  }));

  it('is created', inject([UserService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));

  const setConnections = body => {
    backend.connections.subscribe(function (connection: MockConnection) {
      const options = new ResponseOptions({
        body: JSON.stringify(body)
      });
      connection.mockRespond(new Response(options));
    });
  };

  it('gets all users', () => {
    setConnections(testUsers);
    service.getAll().subscribe(res => {
      expect(res).toEqual(testUsers);
    });
  });

  it('counts all users', () => {
    setConnections(testUsers.length);
    service.count().subscribe(res => {
      expect(res).toEqual(testUsers.length);
    });
  });

  it('creates the user', () => {
    setConnections(testUsers[0]);
    service.create(testUsers[0]).subscribe(res => {
      expect(res).toEqual(testUsers[0]);
    });
  });

  it('gets the user', () => {
    setConnections(testUsers[0]);
    service.getById(testUsers[0]._id).subscribe(res => {
      expect(res).toEqual(testUsers[0]);
    });
  });

  it('updates the user', () => {
    setConnections(testUsers[0]);
    service.update(testUsers[0]).subscribe(res => {
      expect(res).toEqual(testUsers[0]);
    });
  });

  it('deletes the user', () => {
    setConnections(testUsers[0]);
    service.delete(testUsers[0]).subscribe(res => {
      expect(res).toEqual(testUsers[0]);
    });
  });
});
