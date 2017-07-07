import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NewVolunteerFormComponent } from './new-volunteer-form.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdAutocompleteModule, MdInputModule } from '@angular/material';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';
import { HttpModule } from '@angular/http';

describe('NewVolunteerFormComponent', () => {
  let component: NewVolunteerFormComponent,
    fixture: ComponentFixture<NewVolunteerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewVolunteerFormComponent],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MdAutocompleteModule,
        MdInputModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: []
    })
      .compileComponents()
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewVolunteerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  ['firstName', 'lastName', 'petName'].forEach(form => {
    describe((`${form} control`), () => {
      let control: AbstractControl;

      beforeEach(async(() => {
        control = component.formGroup.controls[form];
      }));

      it('should validate requirement', (() => {
        expect(control.valid).toBeFalsy();
        const errors = control.errors || {};
        expect(errors['required']).toBeTruthy();
      }));

      it('should validate min length', (() => {
        control.setValue('C');
        const errors = control.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();
      }));

      it('should validate max length', (() => {
        control.setValue('Quinquagintaquadringentilliards');
        const errors = control.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['maxlength']).toBeTruthy();
      }));

      it('should validate pattern', (() => {
        control.setValue('!@#$%^&*()_+');
        const errors = control.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeTruthy();
      }));

      it('should accept a valid name', (() => {
        control.setValue('Cerberus');
        expect(control.errors).toBeFalsy();
      }));

      it('should clear the form on submit', (() => {
        control.setValue('Cerberus');
        component.onSubmit();
        expect(control.value).toBeFalsy();
      }));
    });
  })
});
