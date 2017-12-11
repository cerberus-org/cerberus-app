import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NewUserFormComponent } from './new-user-form.component';
import { testUsers, User } from '../../models/user';

describe('NewUserFormComponent', () => {
  let component: NewUserFormComponent;
  let fixture: ComponentFixture<NewUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewUserFormComponent],
      imports: [
        MatInputModule,
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

  it('should emit a validUser event on valid form values', () => {
    spyOn(component.validUser, 'emit');
    const firstName = testUsers[0].firstName;
    const lastName = testUsers[0].lastName;
    const email = testUsers[0].email;
    const password = testUsers[0].password;
    component.formGroup.controls['firstName'].setValue(firstName);
    component.formGroup.controls['lastName'].setValue(lastName);
    component.formGroup.controls['email'].setValue(email);
    component.formGroup.controls['password'].setValue(password);
    expect(component.validUser.emit).toHaveBeenCalledWith(new User(firstName, lastName, email, password));
  });

  describe('firstName control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['firstName'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should validate min length', (() => {
      const control = component.formGroup.controls['firstName'];
      control.setValue('A');
      expect(control.valid).toBeFalsy();
      expect(control.errors['minlength']).toBeTruthy();
    }));

    it('should validate max length', (() => {
      const control = component.formGroup.controls['firstName'];
      control.setValue('Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit Aenean Commodo Li');
      expect(control.valid).toBeFalsy();
      expect(control.errors['maxlength']).toBeTruthy();
    }));

    it('should accept a valid first name', (() => {
      const control = component.formGroup.controls['firstName'];
      control.setValue('Ted');
      expect(control.valid).toBeTruthy();
    }));
  });

  describe('lastName control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['lastName'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should validate min length', (() => {
      const control = component.formGroup.controls['lastName'];
      control.setValue('A');
      expect(control.valid).toBeFalsy();
      expect(control.errors['minlength']).toBeTruthy();
    }));

    it('should validate max length', (() => {
      const control = component.formGroup.controls['lastName'];
      control.setValue('Lorem Ipsum Dolor Sit Amet Consectetuer Adipiscing Elit Aenean Commodo Li');
      expect(control.valid).toBeFalsy();
      expect(control.errors['maxlength']).toBeTruthy();
    }));

    it('should accept a valid last name', (() => {
      const control = component.formGroup.controls['lastName'];
      control.setValue('Mader');
      expect(control.valid).toBeTruthy();
    }));
  });

  describe('website control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['email'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should validate max length', (() => {
      const control = component.formGroup.controls['email'];
      control.setValue('Lorem.ipsum.dolor.sit.amet.consectetuer.adipiscing.elit.Aenean.commodo.ligula.eget.dolor' +
        '.Aenean.massa.Cum.sociis.natoque.penatibus.et.magnis.dis.parturient.montes.nascetur.ridiculus.mus.Donec.quam' +
        '.felis.ultricies.nec.pellentesque.eu.pretium.quis.Lorem.ipsum.@gmailcom');
      expect(control.valid).toBeFalsy();
      expect(control.errors['maxlength']).toBeTruthy();
    }));

    it('should validate the address', (() => {
      const control = component.formGroup.controls['email'];
      control.setValue('notAnEmail');
      expect(control.valid).toBeFalsy();
      expect(control.errors['email']).toBeTruthy();
    }));

    it('should accept a valid email', (() => {
      const control = component.formGroup.controls['email'];
      control.setValue('test@gmail.com');
      expect(control.valid).toBeTruthy();
    }));
  });

  describe('password control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['password'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should validate min length', (() => {
      const control = component.formGroup.controls['password'];
      control.setValue('1234567');
      expect(control.valid).toBeFalsy();
      expect(control.errors['minlength']).toBeTruthy();
    }));

    it('should validate max length', (() => {
      const control = component.formGroup.controls['password'];
      control.setValue('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.' +
        'Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis');
      expect(control.valid).toBeFalsy();
      expect(control.errors['maxlength']).toBeTruthy();
    }));

    it('should accept a valid password', (() => {
      const control = component.formGroup.controls['password'];
      control.setValue('password');
      expect(control.valid).toBeTruthy();
    }));
  });
});
