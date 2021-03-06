import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';
import { MockErrorService } from '../../../mocks/classes/error.service.mock';
import { createMockVolunteers, mockVolunteers } from '../../../mocks/objects/volunteer.mock';
import { Volunteer } from '../../shared/models';
import { ErrorService } from './error.service';
import { VolunteerService } from './volunteer.service';

describe('VolunteerService', () => {
  let service: VolunteerService;
  let volunteer: Volunteer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        VolunteerService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService },
      ],
    });
    const testbed = getTestBed();
    service = testbed.get(VolunteerService);
    volunteer = createMockVolunteers()[0];
    volunteer.name = 'tED mAdEr';
    volunteer.petName = 'miMI';
  }));

  it('should be created', inject([VolunteerService], (volunteerService: VolunteerService) => {
    expect(volunteerService).toBeTruthy();
  }));

  it('should convert data coming from the database', () => {
    const converted = service.mapDocumentToObject(volunteer);
    expect(converted).toEqual(mockVolunteers[0]);
  });

  it('should convert data going to the database', () => {
    const converted = service.mapObjectToDocument(volunteer);
    expect(converted).toEqual(mockVolunteers[0]);
  });
});
