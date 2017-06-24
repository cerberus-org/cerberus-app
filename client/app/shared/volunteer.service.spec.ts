import { TestBed, inject, async, getTestBed, } from '@angular/core/testing';
import {
  HttpModule,
  ResponseOptions,
  Response,
  RequestMethod,
  XHRBackend,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { VolunteerService } from './volunteer.service';

const mockResponse = {
  _id: "594a89f64f081c10c0337080",
  updated_at: "2017-06-21T15:00:06.977Z",
  created_a: "2017-06-21T15:00:06.977Z",
  firstName: "Ted",
  lastName: "Mader",
  petName: "Mimi",
  __v: 0
}

const mockVolunteer = {
  firstName: "Ted",
  lastName: "Mader",
  petName: "Mimi",
}

describe('VolunteerService', () => {
  let backend: MockBackend;
  let service: VolunteerService;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        providers: [
            BaseRequestOptions,
            MockBackend,
            VolunteerService,
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
                useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                    return new Http(backend, defaultOptions);
                }
            }
        ]
    });
    
    // testbed, backend and service will be utilized for tests
    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(VolunteerService);

    }));
      
    // Establishes how the fake server will respond
    function setupConnections(backend: MockBackend, options: any) {
      // If the backend receives a request (aka connection), the connection
      // returns and Observable and the Observable is subscribed
      backend.connections.subscribe((connection: MockConnection) => {
        if (connection.request.url === '/api/volunteer') {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);
            connection.mockRespond(response);
        }
      });
    }
    
    it('should be created', inject([VolunteerService], (service: VolunteerService) => {
      expect(service).toBeTruthy();
    }));
  
    it('should return the list of forms from the server on success', () => {
      // Tell the connection what to return and the expected status code
      setupConnections(backend, {
          body: {
                  _id: "594a89f64f081c10c0337080",
                  updated_at: "2017-06-21T15:00:06.977Z",
                  created_a: "2017-06-21T15:00:06.977Z",
                  firstName: "Ted",
                  lastName: "Mader",
                  petName: "Mimi",
                  __v: 0
          },
          status: 200
        });

        service.postVolunteer(mockVolunteer).subscribe(res => {
            expect(res).toEqual(mockResponse);
        });
      });
});
