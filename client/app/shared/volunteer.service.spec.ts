import { TestBed, inject, async, getTestBed, } from '@angular/core/testing';
import {
  ResponseOptions,
  Response,
  XHRBackend,
  BaseRequestOptions,
  Http
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { VolunteerService } from './volunteer.service';

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
                useFactory: (mockBackend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                    return new Http(mockBackend, defaultOptions);
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
    function setupConnections(mockBackend: MockBackend, options: any) {
      // If the backend receives a request (aka connection), the connection
      // returns and Observable and the Observable is subscribed
      mockBackend.connections.subscribe((connection: MockConnection) => {
            const responseOptions = new ResponseOptions(options);
            const response = new Response(responseOptions);
            connection.mockRespond(response);
      });
    }

    it('should be created', inject([VolunteerService], (volunteerService: VolunteerService) => {
      expect(volunteerService).toBeTruthy();
    }));

    it('should post volunteer', () => {
      // Tell the connection what to return and the expected status code
      setupConnections(backend, {
          body: {
            test: 'test'
          },
          status: 200
        });

        service.postVolunteer({test: 'test'}).subscribe(res => {
            expect(res).toEqual({test: 'test'});
        });
      });

      it('should get volunteers', () => {
        setupConnections(backend, {
            body: {
              test: 'test'
            },
            status: 201
          });

          service.getVolunteers().subscribe(res => {
              expect(res).toEqual({test: 'test'});
          });
        });
});
