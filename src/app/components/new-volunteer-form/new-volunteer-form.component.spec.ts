import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule, MatListModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { testOrganizations, testVolunteers, Volunteer } from '../../models';
import { NewVolunteerFormComponent } from './components';

describe('NewVolunteerFormComponent', () => {
  let component: NewVolunteerFormComponent;
  let fixture: ComponentFixture<NewVolunteerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewVolunteerFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatAutocompleteModule,
        MatListModule,
        MatInputModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVolunteerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a new volunteer on submit', () => {
    spyOn(component.newVolunteer, 'emit');
    const organizationId = testOrganizations[0].id;
    const firstName = testVolunteers[0].firstName;
    const lastName = testVolunteers[0].lastName;
    const petName = testVolunteers[0].petName;
    component.organizationId = organizationId;
    component.formGroup.controls['firstName'].setValue(firstName);
    component.formGroup.controls['lastName'].setValue(lastName);
    component.formGroup.controls['petName'].setValue(petName);
    component.submit();
    expect(component.newVolunteer.emit)
      .toHaveBeenCalledWith(new Volunteer(organizationId, firstName, lastName, petName));
  });

  ['firstName', 'lastName', 'petName'].forEach((form) => {
    describe((`${form} control`), () => {
      let control: AbstractControl;

      beforeEach(async(() => {
        control = component.formGroup.controls[form];
      }));

      it('should validate requirement', (() => {
        expect(control.valid).toBeFalsy();
        expect(control.errors['required']).toBeTruthy();
      }));

      it('should validate min length', (() => {
        control.setValue('C');
        expect(control.errors['required']).toBeFalsy();
        expect(control.errors['minlength']).toBeTruthy();
      }));

      it('should validate max length', (() => {
        control.setValue('Quinquagintaquadringentilliards');
        expect(control.errors['required']).toBeFalsy();
        expect(control.errors['maxlength']).toBeTruthy();
      }));

      it('should validate the pattern', (() => {
        control.setValue('!@#$%^&*()_+');
        expect(control.errors['required']).toBeFalsy();
        expect(control.errors['pattern']).toBeTruthy();
      }));

      it('should accept a valid name', (() => {
        control.setValue('Cerberus');
        expect(control.valid).toBeTruthy();
        expect(control.errors).toBeFalsy();
      }));

      it('should clear the form on submit', (() => {
        control.setValue('Cerberus');
        component.submit();
        expect(control.value).toBeFalsy();
      }));
    });
  });
});
