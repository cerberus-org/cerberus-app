import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdInputModule, MdRadioModule, MdSnackBarModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { CheckInFormComponent } from './check-in-form.component';
import { MockVisitService, VisitService } from '../../../services/visit.service';
import { testVisits } from '../../../models/visit';
import { testVolunteers } from '../../../models/volunteer';
import { StoreModule } from '@ngrx/store';
import { visitReducer } from '../../../reducers/visit';
import { volunteerReducer } from '../../../reducers/volunteer';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureFieldComponent } from './signature-field/signature-field.component';
import ErrorService, { MockErrorService } from '../../../services/error.service';

describe('CheckInFormComponent', () => {
  let component: CheckInFormComponent;
  let fixture: ComponentFixture<CheckInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckInFormComponent, SignatureFieldComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MdAutocompleteModule,
        MdInputModule,
        MdRadioModule,
        MdSnackBarModule,
        SignaturePadModule,
        StoreModule.provideStore({ visits: visitReducer, volunteers: volunteerReducer })
      ],
      providers: [
        { provide: VisitService, useClass: MockVisitService }, { provide: ErrorService, useClass: MockErrorService }
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
    const filtered = component.filterVolunteersByName(testVolunteers, testVolunteers[0].firstName);
    expect(filtered.length).toBe(2);
    expect(filtered[0]).toBe(testVolunteers[0]);
  });

  it('filters volunteers by pet name', () => {
    const filtered = component.filterVolunteersByPetName(testVolunteers, testVolunteers[0].petName);
    expect(filtered.length).toBe(1);
    expect(filtered[0]).toBe(testVolunteers[0]);
  });

  it('finds an active visit for a volunteer', () => {
    const found = component.findActiveVisitForVolunteer(testVisits, testVolunteers[0]);
    expect(found).toBe(testVisits[3]);
  });

  it('finds a volunteer by pet name', () => {
    const found = component.findVolunteerByPetName(testVolunteers, testVolunteers[0].petName);
    expect(found).toBe(testVolunteers[0]);
  });

  it('checks if there are many volunteers with the same name', () => {
    const filtered = component.filterVolunteersByName(testVolunteers, testVolunteers[0].firstName);
    const many = component.checkIfSameNames(filtered, `${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`);
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
      component.filteredVolunteers = component.filterVolunteersByName(testVolunteers, testVolunteers[0].firstName);
      const control = component.formGroup.controls['petName'];
      control.setValue('Mimi');
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeFalsy();
    }));
  });

  describe('signatureField control', () => {

    it('validates requirement on check in', (() => {
      const control = component.formGroup.controls['signatureField'];
      control.setValue('test');
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeFalsy();
    }));

    it('validates non-requirement on check out', (() => {
      const control = component.formGroup.controls['signatureField'];
      component.activeVisitForVolunteer = testVisits[0];
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeFalsy();
    }));
  });
});
