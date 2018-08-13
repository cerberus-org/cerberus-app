import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Volunteer } from '../../../shared/models';
import { NewVolunteerFormComponent } from './new-volunteer-form.component';

describe('NewVolunteerFormComponent', () => {
  let component: NewVolunteerFormComponent;
  let fixture: ComponentFixture<NewVolunteerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewVolunteerFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatAutocompleteModule,
        MatListModule,
        MatInputModule,
        MatDialogModule,
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

  it('should open the dialog when openServicesAgreementDialog is called', () => {
    spyOn(component.dialog, 'open');
    component.openServicesAgreementDialog();
    expect(component.dialog.open).toHaveBeenCalled();
  });

  it('should emit a new volunteer on submit', () => {
    const emitSpy = spyOn(component.newVolunteer, 'emit');
    const firstName = 'Ted';
    const lastName = 'Mader';
    const petName = 'Mimi';
    component.formGroup.controls['firstName'].setValue(firstName);
    component.formGroup.controls['lastName'].setValue(lastName);
    component.formGroup.controls['petName'].setValue(petName);
    component.submit();
    expect(emitSpy).toHaveBeenCalledWith(new Volunteer(`${firstName} ${lastName}`, petName));
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
