import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CheckInFormComponent } from './check-in-form.component';
import { MockVolunteerService, VolunteerService } from '../../shared/volunteer.service';
import { MockVisitService, VisitService } from '../../shared/visit.service';
import { testVisits } from '../../shared/visit';
import { testVolunteers } from '../../shared/volunteer';

describe('CheckInFormComponent', () => {
  let component: CheckInFormComponent;
  let fixture: ComponentFixture<CheckInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckInFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MdAutocompleteModule,
        MdInputModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: VisitService, useClass: MockVisitService },
        { provide: VolunteerService, useClass: MockVolunteerService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('creates the form group', () => {
    component.createForm();
    expect(component.formGroup).toBeTruthy();
    expect(component.formGroup.controls['name']).toBeTruthy();
    expect(component.formGroup.controls['petName']).toBeTruthy();
  });

  it('gets the visits', () => {
    component.getVisits();
    expect(component.visits.length).toBe(testVisits.length);
  });

  it('gets the visits', () => {
    component.getVisits();
    expect(component.visits.length).toBe(testVisits.length);
  });

  it('gets the volunteers', () => {
    component.getVolunteers();
    expect(component.volunteers.length).toBe(testVolunteers.length);
  });

  it('filters volunteers by first and last name', () => {
    component.volunteers = testVolunteers;
    component.filterVolunteers(testVolunteers[0].firstName);
    expect(component.filteredVolunteers.length).toBe(2);
    expect(component.filteredVolunteers[0]).toBe(testVolunteers[0]);
  });

  it('filters volunteers by pet name', () => {
    component.filteredVolunteers = testVolunteers;
    component.filterVolunteersByPetName(testVolunteers[0].petName);
    expect(component.filteredVolunteersByPetName.length).toBe(1);
    expect(component.filteredVolunteersByPetName[0]).toBe(testVolunteers[0]);
  });

  it('finds an active visit for a volunteer', () => {
    component.visits = testVisits;
    component.selectedVolunteer = testVolunteers[0];
    const found = component.findActiveVisitForVolunteer();
    expect(found).toBe(testVisits[0]);
  });

  it('finds a volunteer by pet name', () => {
    component.filteredVolunteers = testVolunteers;
    const found = component.findVolunteerByPetName(testVolunteers[0].petName);
    expect(found).toBe(testVolunteers[0]);
  });

  it('checks if there are many volunteers with the same name', () => {
    component.filteredVolunteers = testVolunteers;
    component.filterVolunteers(testVolunteers[0].firstName);
    const many = component.checkIfFilteredHaveSameName(`${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`);
    expect(many).toBeTruthy();
  });
});
