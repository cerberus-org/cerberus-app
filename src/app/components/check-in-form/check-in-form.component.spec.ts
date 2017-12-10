import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatRadioModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { SignaturePadModule } from 'angular2-signaturepad';

import { CheckInFormComponent } from './check-in-form.component';
import { SignatureFieldComponent } from './signature-field/signature-field.component';
import { testVisits } from '../../models/visit';
import { testVolunteers } from '../../models/volunteer';
import { reducers } from '../../reducers/index';

describe('CheckInFormComponent', () => {
  let component: CheckInFormComponent;
  let fixture: ComponentFixture<CheckInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckInFormComponent,
        SignatureFieldComponent
      ],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatRadioModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SignaturePadModule,
        StoreModule.forRoot(reducers)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInFormComponent);
    component = fixture.componentInstance;
    spyOn(component, 'subscribeToForm').and.stub();
    spyOn(component, 'updateForm').and.stub();
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

  it('filters by name', () => {
    const name = testVolunteers[1].firstName;
    const filtered = component.filterVolunteersByName(testVolunteers, name);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toBe(testVolunteers[1]);
  });

  it('creates the list of unique names for the filtered testVolunteers', () => {
    const names = component.getUniqueNames(testVolunteers);
    expect(names.length).toEqual(2);
    expect(names[0]).toEqual(`${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`);
    expect(names[1]).toEqual(`${testVolunteers[1].firstName} ${testVolunteers[1].lastName}`);
  });

  it('checks if the filtered volunteers all match the same name', () => {
    const volunteers = [testVolunteers[0], testVolunteers[2]];
    const name = `${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`;
    const allMatch = component.allMatchName(volunteers, name);
    expect(allMatch).toBeTruthy();
  });

  it('selects a volunteer by name', () => {
    const name = `${testVolunteers[1].firstName} ${testVolunteers[1].lastName}`;
    const selected = component.selectVolunteerByName(testVolunteers, name);
    expect(selected).toBe(testVolunteers[1]);
  });

  it('does not select a volunteer if the name does not exactly match', () => {
    const name = testVolunteers[1].firstName;
    const selected = component.selectVolunteerByName(testVolunteers, name);
    expect(selected).toBeFalsy();
  });

  it('selects a volunteer by petName', () => {
    const petName = testVolunteers[2].petName;
    const selected = component.selectVolunteerByPetName(testVolunteers, petName);
    expect(selected).toBe(testVolunteers[2]);
  });

  it('selects an active visit for a voluntneer', () => {
    const volunteer = Object.assign({}, testVolunteers[0]);
    const selected = component.selectActiveVisit(testVisits, volunteer);
    expect(selected).toBe(testVisits[3]);
  });

  describe('name control', () => {

    it('throws required error if value is not entered', (() => {
      const control = component.formGroup.controls['name'];
      expect(control.errors['required']).toBeTruthy();
    }));

    it('throws noMatchByName error if volunteer is not selected and petName form is not shown', (() => {
      component.selectedVolunteer = null;
      component.showPetNameForm = false;
      const control = component.formGroup.controls['name'];
      expect(control.errors['noMatchByName']).toBeTruthy();
    }));

    it('is valid if value is entered and volunteer is selected', (() => {
      component.selectedVolunteer = testVolunteers[1];
      const control = component.formGroup.controls['name'];
      control.setValue('Cerberus');
      expect(control.valid).toBeTruthy();
    }));

    it('is valid (not required) if value is entered and petName form is shown', (() => {
      component.showPetNameForm = true;
      const control = component.formGroup.controls['name'];
      control.setValue('Cerberus');
      expect(control.valid).toBeTruthy();
    }));

    it('clears the form on submit', (() => {
      const control = component.formGroup.controls['name'];
      control.setValue('Cerberus');
      component.onSubmit();
      expect(control.value).toBeFalsy();
    }));
  });

  describe('petName control', () => {

    it('clears the form on submit', (() => {
      const control = component.formGroup.controls['petName'];
      control.setValue('Cerberus');
      component.onSubmit();
      expect(control.value).toBeFalsy();
    }));

    it('is valid if a volunteer is selected', (() => {
      component.selectedVolunteer = testVolunteers[0];
      const control = component.formGroup.controls['petName'];
      control.setValue('Mimi');
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeFalsy();
    }));
  });

  describe('signatureField control', () => {

    it('is valid if value is entered', (() => {
      const control = component.formGroup.controls['signatureField'];
      control.setValue('test');
      expect(control.valid).toBeTruthy();
    }));

    it('is valid (not required) if there is an active visit', (() => {
      const control = component.formGroup.controls['signatureField'];
      control.setValue('test');
      expect(control.valid).toBeTruthy();
    }));

    it('throws noSignature error if value is not entered', (() => {
      const control = component.formGroup.controls['signatureField'];
      component.activeVisit = testVisits[0];
      expect(control.errors['noSignature']).toBeTruthy();
    }));
  });
});
