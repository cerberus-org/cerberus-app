import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatRadioModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { testVisits, testVolunteers } from '../../../models/index';
import { CheckInFormComponent } from './check-in-form.component';

describe('CheckInFormComponent', () => {
  let component: CheckInFormComponent;
  let fixture: ComponentFixture<CheckInFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CheckInFormComponent,
        MockComponent({ selector: 'app-signature-field' }),
      ],
      imports: [
        MatAutocompleteModule,
        MatInputModule,
        MatRadioModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInFormComponent);
    component = fixture.componentInstance;
    spyOn(component, 'subscribeToForm').and.stub();
    spyOn(component, 'updateForm').and.stub();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a checkOut event on submit if there is an active visit', () => {
    spyOn(component.checkOut, 'emit');
    component.selectedVolunteer = testVolunteers[0];
    component.activeVisit = testVisits[0];
    component.submit();
    expect(component.checkOut.emit).toHaveBeenCalled();
  });

  it('should emit a checkIn event on submit if there is no active visit and a volunteer is selected', () => {
    spyOn(component.checkIn, 'emit');
    component.selectedVolunteer = testVolunteers[0];
    component.submit();
    expect(component.checkIn.emit).toHaveBeenCalled();
  });

  it('should create the form group', () => {
    component.createForm();
    expect(component.formGroup).toBeTruthy();
    expect(component.formGroup.controls['name']).toBeTruthy();
    expect(component.formGroup.controls['petName']).toBeTruthy();
  });

  describe('name control', () => {

    it('should throw required error if value is not entered', (() => {
      const control = component.formGroup.controls['name'];
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should return a noMatchByName error if newVolunteer is not selected and petName form is not shown', (() => {
      component.selectedVolunteer = null;
      component.showPetNameForm = false;
      const control = component.formGroup.controls['name'];
      expect(control.errors['noMatchByName']).toBeTruthy();
    }));

    it('should be valid if value is entered and newVolunteer is selected', (() => {
      component.selectedVolunteer = testVolunteers[1];
      const control = component.formGroup.controls['name'];
      control.setValue('Cerberus');
      expect(control.valid).toBeTruthy();
    }));

    it('should be valid (not required) if value is entered and petName form is shown', (() => {
      component.showPetNameForm = true;
      const control = component.formGroup.controls['name'];
      control.setValue('Cerberus');
      expect(control.valid).toBeTruthy();
    }));

    it('should clear the form on submit', (() => {
      const control = component.formGroup.controls['name'];
      control.setValue('Cerberus');
      component.selectedVolunteer = testVolunteers[0];
      component.submit();
      expect(control.value).toBeFalsy();
    }));
  });

  describe('petName control', () => {

    it('should clear the form on submit', (() => {
      const control = component.formGroup.controls['petName'];
      control.setValue('Cerberus');
      component.selectedVolunteer = testVolunteers[0];
      component.submit();
      expect(control.value).toBeFalsy();
    }));

    it('should be valid if a newVolunteer is selected', (() => {
      component.selectedVolunteer = testVolunteers[0];
      const control = component.formGroup.controls['petName'];
      control.setValue('Mimi');
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeFalsy();
    }));
  });

  describe('signatureField control', () => {

    it('should be valid if value is entered', (() => {
      const control = component.formGroup.controls['signatureField'];
      control.setValue('test');
      expect(control.valid).toBeTruthy();
    }));

    it('should be valid (not required) if there is an active visit', (() => {
      const control = component.formGroup.controls['signatureField'];
      control.setValue('test');
      expect(control.valid).toBeTruthy();
    }));

    it('should return a noSignature error if value is not entered', (() => {
      const control = component.formGroup.controls['signatureField'];
      component.activeVisit = testVisits[0];
      expect(control.errors['noSignature']).toBeTruthy();
    }));
  });
});
