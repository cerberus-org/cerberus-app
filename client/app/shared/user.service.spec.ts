import { TestBed, inject, async, getTestBed, } from '@angular/core/testing';
import {
  ResponseOptions,
  Response,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserService } from './user.service';
import { testUsers } from './user';

describe('UserService', () => {
  let backend: MockBackend = null;
  let service: UserService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        UserService,
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

  it('logs the user in', () => {
    // Tell the connection what to return and the expected status code
    setConnections({ token: 'token' });
    service.login(testUsers[0]).subscribe(res => {
      expect(res).toEqual({ token: 'token' });
    });
  });

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
    service.get(testUsers[0]).subscribe(res => {
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
