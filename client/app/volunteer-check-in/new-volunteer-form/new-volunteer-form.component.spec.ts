import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdAutocompleteModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NewVolunteerFormComponent } from './new-volunteer-form.component';
import { MockVolunteerService, VolunteerService } from '../../shared/volunteer.service';

describe('NewVolunteerFormComponent', () => {
  let component: NewVolunteerFormComponent,
    fixture: ComponentFixture<NewVolunteerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewVolunteerFormComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MdAutocompleteModule,
        MdInputModule,
        BrowserAnimationsModule
      ],
      providers: [{ provide: VolunteerService, useClass: MockVolunteerService }]
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

      it('capitalizes with single hyphen', (() => {
        control.setValue('one-two');
        component.capitalize();
        expect(control.value).toBe('One-Two')
      }));

      it('capitalizes with multiple hyphens', (() => {
        control.setValue('one-two-three');
        component.capitalize();
        expect(control.value).toEqual('One-Two-Three')
      }));

      it('capitalizes with hyphen then word', (() => {
        control.setValue('one-two three');
        component.capitalize();
        expect(control.value).toEqual('One-Two Three')
      }));

      it('capitalizes with word then hyphen', (() => {
        control.setValue('one two-three');
        component.capitalize();
        expect(control.value).toEqual('One Two-Three')
      }));

      it('capitalizes single word', (() => {
        control.setValue('one');
        component.capitalize();
        expect(control.value).toEqual('One')
      }));

      it('capitalizes multiple words', (() => {
        control.setValue('one two three');
        component.capitalize();
        expect(control.value).toEqual('One Two Three')
      }));
    });
  })
});
