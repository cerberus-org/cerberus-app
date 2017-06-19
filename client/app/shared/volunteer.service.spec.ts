import { TestBed, inject } from '@angular/core/testing';
import {
  HttpModule,
  ResponseOptions,
  Response,
  RequestMethod
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { VolunteerService } from './volunteer.service';

const mockResponse = {
  first: "Jane",
  last: "Jo",
  pet : "Spot"
}

describe('VolunteerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        VolunteerService, 
        MockBackend,
      ]
    });
  });

  it('should be created', inject([VolunteerService], (service: VolunteerService) => {
    expect(service).toBeTruthy();
  }));
  
  it('should post volunteer',
    inject([
      MockBackend, 
      VolunteerService
    ], (mockBackend: MockBackend, volunteerService: VolunteerService) => {

      const expectedUrl = 'app/postMockVolunteer.json';
    
      // subscribe to any incoming connections from the back-end
      mockBackend.connections.subscribe(
        // MockConnection always us to configure the response we want to send out form our back-end
        // as well as test incoming requests. 
        (connection: MockConnection) => {
          expect(connection.request.method).toBe(RequestMethod.Post);
          expect(connection.request.url).toBe(expectedUrl);

          connection.mockRespond(new Response(
            new ResponseOptions({ body: mockResponse })
          ));
        });

        volunteerService.postVolunteer('app/postMockVolunteer.json')
        .subscribe(res => {
          expect(res).toEqual(mockResponse);
        })
    })
  );
});
