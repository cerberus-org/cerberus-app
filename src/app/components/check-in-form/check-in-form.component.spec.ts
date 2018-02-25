import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatRadioModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponent } from 'ng2-mock-component';

import { testVisits, testVolunteers } from '../../models';
import { CheckInFormComponent } from './components';

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

  it('should filter by name', () => {
    const name = testVolunteers[1].firstName;
    const filtered = component.filterVolunteersByName(testVolunteers, name);
    expect(filtered.length).toEqual(1);
    expect(filtered[0]).toBe(testVolunteers[1]);
  });

  it('should create the list of unique names for the filtered testVolunteers', () => {
    const names = component.getUniqueNames(testVolunteers);
    expect(names.length).toEqual(2);
    expect(names[0]).toEqual(`${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`);
    expect(names[1]).toEqual(`${testVolunteers[1].firstName} ${testVolunteers[1].lastName}`);
  });

  it('should check if the filtered volunteers all match the same name', () => {
    const volunteers = [testVolunteers[0], testVolunteers[2]];
    const name = `${testVolunteers[0].firstName} ${testVolunteers[0].lastName}`;
    const allMatch = component.allMatchName(volunteers, name);
    expect(allMatch).toBeTruthy();
  });

  it('should select a newVolunteer by name', () => {
    const name = `${testVolunteers[1].firstName} ${testVolunteers[1].lastName}`;
    const selected = component.selectVolunteerByName(testVolunteers, name);
    expect(selected).toBe(testVolunteers[1]);
  });

  it('should not select a newVolunteer if the name does not exactly match', () => {
    const name = testVolunteers[1].firstName;
    const selected = component.selectVolunteerByName(testVolunteers, name);
    expect(selected).toBeFalsy();
  });

  it('should select a newVolunteer by petName', () => {
    const petName = testVolunteers[2].petName;
    const selected = component.selectVolunteerByPetName(testVolunteers, petName);
    expect(selected).toBe(testVolunteers[2]);
  });

  it('should select an active visit for a voluntneer', () => {
    const volunteer = Object.assign({}, testVolunteers[0]);
    const selected = component.selectActiveVisit(testVisits, volunteer);
    expect(selected).toBe(testVisits[3]);
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
