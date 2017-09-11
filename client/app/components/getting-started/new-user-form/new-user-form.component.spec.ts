import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewUserFormComponent } from './new-user-form.component';
import { MdInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NewUserFormComponent', () => {
  let component: NewUserFormComponent;
  let fixture: ComponentFixture<NewUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewUserFormComponent],
      imports: [
        MdInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('firstName control', () => {

    it('validates requirement', (() => {
      const control = component.formGroup.controls['firstName'];
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    }));

    it('validates min length', (() => {
      const control = component.formGroup.controls['firstName'];
      control.setValue('A');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['minlength']).toBeTruthy();
    }));

    it('validates max length', (() => {
      const control = component.formGroup.controls['firstName'];
      control.setValue('Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit Aenean Commodo Li');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    }));
  });

  describe('lastName control', () => {

    it('validates requirement', (() => {
      const control = component.formGroup.controls['lastName'];
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    }));

    it('validates min length', (() => {
      const control = component.formGroup.controls['lastName'];
      control.setValue('A');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['minlength']).toBeTruthy();
    }));

    it('validates max length', (() => {
      const control = component.formGroup.controls['lastName'];
      control.setValue('Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit Aenean Commodo Li');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    }));
  });

  describe('website control', () => {

    it('validates requirement', (() => {
      const control = component.formGroup.controls['email'];
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    }));

    it('validates max length', (() => {
      const control = component.formGroup.controls['email'];
      control.setValue('Lorem.ipsum.dolor.sit.amet.consectetuer.adipiscing.elit.Aenean.commodo.ligula.eget.dolor' +
        '.Aenean.massa.Cum.sociis.natoque.penatibus.et.magnis.dis.parturient.montes.nascetur.ridiculus.mus.Donec.quam' +
        '.felis.ultricies.nec.pellentesque.eu.pretium.quis.Lorem.ipsum.@gmailcom');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    }));

    it('accepts valid emails', (() => {
      const control = component.formGroup.controls['email'];
      control.setValue('test@gmail.com');
      expect(control.valid).toBeTruthy();
    }));

    it('does not accept invalid websites', (() => {
      const control = component.formGroup.controls['email'];
      control.setValue('notAnEmail');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['email']).toBeTruthy();
    }));
  });

  describe('password control', () => {

    it('validates requirement', (() => {
      const control = component.formGroup.controls['password'];
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
    }));

    it('validates min length', (() => {
      const control = component.formGroup.controls['password'];
      control.setValue('1234567');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['minlength']).toBeTruthy();
    }));

    it('validates max length', (() => {
      const control = component.formGroup.controls['password'];
      control.setValue('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.' +
        'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis');
      const errors = control.errors || {};
      expect(control.valid).toBeFalsy();
      expect(errors['maxlength']).toBeTruthy();
    }));
  });
});
