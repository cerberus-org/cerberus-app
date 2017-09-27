import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { NewVolunteerFormComponent } from './new-volunteer-form.component';
import { MockSnackBarService, SnackBarService } from '../../../services/snack-bar.service';
import { MockVolunteerService, VolunteerService } from '../../../services/volunteer.service';
import { volunteerReducer } from '../../../reducers/volunteer';

describe('NewVolunteerFormComponent', () => {
  let component: NewVolunteerFormComponent,
    fixture: ComponentFixture<NewVolunteerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewVolunteerFormComponent],
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MdAutocompleteModule,
        MdInputModule,
        RouterTestingModule,
        StoreModule.provideStore({ volunteers: volunteerReducer })
      ],
      providers: [
        { provide: SnackBarService, useClass: MockSnackBarService },
        { provide: VolunteerService, useClass: MockVolunteerService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVolunteerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  ['firstName', 'lastName', 'petName'].forEach(form => {
    describe((`${form} control`), () => {
      let control: AbstractControl;

      beforeEach(async(() => {
        control = component.formGroup.controls[form];
      }));

      it('validates requirement', (() => {
        const errors = control.errors || {};
        expect(control.valid).toBeFalsy();
        expect(errors['required']).toBeTruthy();
      }));

      it('validates min length', (() => {
        control.setValue('C');
        const errors = control.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['minlength']).toBeTruthy();
      }));

      it('validates max length', (() => {
        control.setValue('Quinquagintaquadringentilliards');
        const errors = control.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['maxlength']).toBeTruthy();
      }));

      it('validates pattern', (() => {
        control.setValue('!@#$%^&*()_+');
        const errors = control.errors || {};
        expect(errors['required']).toBeFalsy();
        expect(errors['pattern']).toBeTruthy();
      }));

      it('accepts a valid name', (() => {
        control.setValue('Cerberus');
        expect(control.valid).toBeTruthy();
        expect(control.errors).toBeFalsy();
      }));

      it('clears the form on submit', (() => {
        control.setValue('Cerberus');
        component.onSubmit();
        expect(control.value).toBeFalsy();
      }));

      it('capitalizes hyphenated String', (() => {
        control.setValue('one-two');
        component.capitalize();
        expect(control.value).toBe('One-Two')
      }));

      it('capitalizes String with multiple hyphens', (() => {
        control.setValue('one-two-three');
        component.capitalize();
        expect(control.value).toEqual('One-Two-Three')
      }));

      it('capitalizes String with multiple hyphenated words', (() => {
        control.setValue('one-two three-four');
        component.capitalize();
        expect(control.value).toEqual('One-Two Three-Four')
      }));

      it('capitalizes uppercase word', (() => {
        control.setValue('ONE TWO-THREE');
        component.capitalize();
        expect(control.value).toEqual('One Two-Three')
      }));

      it('capitalizes single String', (() => {
        control.setValue('one');
        component.capitalize();
        expect(control.value).toEqual('One')
      }));

      it('capitalizes String with multiple words', (() => {
        control.setValue('one two three');
        component.capitalize();
        expect(control.value).toEqual('One Two Three')
      }));

      it('trims white space', (() => {
        control.setValue(' one two three ');
        component.capitalize();
        expect(control.value).toEqual('One Two Three')
      }));
    });
  })
});
