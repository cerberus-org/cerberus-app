import { TestBed, inject, async, getTestBed, } from '@angular/core/testing';
import {
  ResponseOptions,
  Response,
  XHRBackend,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let backend: MockBackend;
  let service: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        UserService,
        {
          // Inject these dependencies into the instance that Http useFactory creates
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          // Http is provided,
          provide: Http,
          // but angular should use MockBackend and BaseRequestOptions instead
          // useFactory creates an instance of Http that depends on MockBackend and BaseRequestOptions
          useFactory: (mockBack: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(mockBack, defaultOptions);
          }
        }
      ]
    });

    // testbed, backend and service will be utilized for tests
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(UserService);
  }));

  // Establishes how the fake server will respond
  function setupConnections(mockBack: MockBackend, options: any) {
    // If the backend receives a request (aka connection), the connection
    // returns and Observable and the Observable is subscribed
    mockBack.connections.subscribe((connection: MockConnection) => {
      const responseOptions = new ResponseOptions(options);
      const response = new Response(responseOptions);
      connection.mockRespond(response);
    });
  }

  it('should be created', inject([UserService], (loginService: UserService) => {
    expect(loginService).toBeTruthy();
  }));

  it('should login user', () => {
    // Tell the connection what to return and the expected status code
    setupConnections(backend, {
      body: {
        test: 'test'
      },
      status: 200
    });

    service.login({email: 'email', username: 'username'}).subscribe(res => {
      expect(res).toEqual({test: 'test'});
    });
  });
});
