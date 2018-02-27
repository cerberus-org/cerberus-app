import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { testUsers, User } from '../../models';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserFormComponent],
      imports: [
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    component.passwordRequired = true;
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
    const confirmPassword = testUsers[0].password;
    component.formGroup.controls['firstName'].setValue(firstName);
    component.formGroup.controls['lastName'].setValue(lastName);
    component.formGroup.controls['email'].setValue(email);
    component.formGroup.controls['password'].setValue(password);
    component.formGroup.controls['confirmPassword'].setValue(confirmPassword);
    expect(component.validUser.emit)
      .toHaveBeenCalledWith(new User(firstName, lastName, email, password, null));
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
      control.setValue('Lorem.ipsum.dolor.sit.amet.consectetuer.adipiscing.elit.Aenean.commodo.ligula.eget.dolor.Aenean.massa.Cum.sociis.natoque.penatibus.et.magnis.dis.parturient.montes.nascetur.ridiculus.mus.Donec.quam.felis.ultricies.nec.pellentesque.eu.pretium.quis.Lorem.ipsum.@gmailcom');
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
      expect(control.errors).toBeTruthy();
    }));

    it('should validate password is not required', (() => {
      component.passwordRequired = false;
      fixture.detectChanges();
      const control = component.formGroup.controls['password'];
      expect(control.valid).toBeFalsy();
      expect(control.errors).toBeTruthy();
    }));

    it('should validate min length', (() => {
      const control = component.formGroup.controls['password'];
      control.setValue('1234567');
      expect(control.valid).toBeFalsy();
      expect(control.errors['minlength']).toBeTruthy();
    }));

    it('should validate max length', () => {
      const control = component.formGroup.controls['password'];
      control.setValue('Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis');
      expect(control.valid).toBeFalsy();
      expect(control.errors['maxlength']).toBeTruthy();
    });

    it('should accept a valid password', (() => {
      const control = component.formGroup.controls['password'];
      control.setValue('password');
      expect(control.valid).toBeTruthy();
    }));
  });

  describe('confirmPassword control', () => {

    it('should validate matching', (() => {
      const pwdControl = component.formGroup.controls['password'];
      const confirmPwdControl = component.formGroup.controls['confirmPassword'];
      pwdControl.setValue('password');
      confirmPwdControl.setValue('confirmPassword');
      expect(confirmPwdControl.valid).toBeFalsy();
      expect(confirmPwdControl.errors).toBeTruthy();
    }));

    it('should accept a valid confirmPassword', (() => {
      const pwdControl = component.formGroup.controls['password'];
      const confirmPwdControl = component.formGroup.controls['confirmPassword'];
      pwdControl.setValue('password');
      confirmPwdControl.setValue('password');
      expect(confirmPwdControl.valid).toBeTruthy();
    }));
  });
});
