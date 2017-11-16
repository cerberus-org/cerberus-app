import { async, getTestBed, inject, TestBed } from '@angular/core/testing';
import { AngularFirestore } from 'angularfire2/firestore';

import { VolunteerService } from './volunteer.service';
import { ErrorService, MockErrorService } from './error.service';
import { testVolunteers, Volunteer } from '../models/volunteer';

describe('VolunteerService', () => {
  let service: VolunteerService;
  let volunteer: Volunteer;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        VolunteerService,
        { provide: AngularFirestore, useValue: null },
        { provide: ErrorService, useClass: MockErrorService }
      ]
    });
    const testbed = getTestBed();
    service = testbed.get(VolunteerService);
    volunteer = Object.assign({}, testVolunteers[0]);
    volunteer.firstName = 'tED';
    volunteer.lastName = 'mAdEr';
    volunteer.petName = 'miMI';
  }));

  it('should be created', inject([VolunteerService], (volunteerService: VolunteerService) => {
    expect(volunteerService).toBeTruthy();
  }));

  it('converts data going to the database', () => {
    const converted = service.convertIn(volunteer);
    expect(converted).toEqual(testVolunteers[0]);
  });

  it('converts coming from the database', () => {
    const converted = service.convertOut(volunteer);
    expect(converted).toEqual(testVolunteers[0]);
  });
});