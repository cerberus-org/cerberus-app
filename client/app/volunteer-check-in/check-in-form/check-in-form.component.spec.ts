import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CheckInFormComponent } from './check-in-form.component';
import { MockVolunteerService, VolunteerService } from '../../services/volunteer.service';
import { MockVisitService, VisitService } from '../../services/visit.service';
import { testVisits } from '../../models/visit';
import { testVolunteers } from '../../models/volunteer';
import { StoreModule } from '@ngrx/store';
import { visitReducer } from '../../reducers/visit';
import { volunteerReducer } from '../../reducers/volunteer';

describe('CheckInFormComponent', () => {
  let component: CheckInFormComponent;
  let fixture: ComponentFixture<CheckInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckInFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MdAutocompleteModule,
        MdInputModule,
        StoreModule.provideStore({ visits: visitReducer, volunteers: volunteerReducer })
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
    component.volunteers = testVolunteers;
    component.filteredVolunteers = testVolunteers;
    component.filterVolunteers(testVolunteers[0].firstName);
    const many = component.checkIfFilteredHaveSameName(`${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`);
    expect(many).toBeTruthy();
  });

  describe('name control', () => {

    it('validates requirement', (() => {
      const control = component.formGroup.controls['name'];
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    }));

    it('validates existence', (() => {
      this.volunteers = testVolunteers;
      const control = component.formGroup.controls['name'];
      control.setValue('Cerberus');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['doesNotExist']).toBeTruthy();
    }));

    it('accepts an existing name', (() => {
      component.volunteers = testVolunteers;
      const control = component.formGroup.controls['name'];
      control.setValue('Ted Mader');
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeFalsy();
    }));

    it('clears the form on submit', (() => {
      const control = component.formGroup.controls['name'];
      control.setValue('Cerberus');
      component.onSubmit();
      expect(control.value).toBeFalsy();
    }));
  });

  describe('petName control', () => {

    beforeEach(() => {
      component.showPetNameForm = true;
    });

    it('clears the form on submit', (() => {
      const control = component.formGroup.controls['petName'];
      control.setValue('Cerberus');
      component.onSubmit();
      expect(control.value).toBeFalsy();
    }));

    it('accepts a petName for a unique volunteer', (() => {
      component.volunteers = testVolunteers;
      component.filteredVolunteers = testVolunteers;
      component.filterVolunteers(testVolunteers[0].firstName);
      const control = component.formGroup.controls['petName'];
      control.setValue('Mimi');
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeFalsy();
    }));
  });
});
