import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions } from '@angular/http';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { VolunteerService } from './volunteer.service';
import { ErrorService, MockErrorService } from './error.service';

describe('VolunteerService', () => {
  let service: VolunteerService = null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFirestoreModule
      ],
      providers: [
        BaseRequestOptions,
        VolunteerService,
        { provide: ErrorService, useClass: MockErrorService }
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(VolunteerService);
  }));

  it('should be created', inject([VolunteerService], (volunteerService: VolunteerService) => {
    expect(volunteerService).toBeTruthy();
  }));
});
