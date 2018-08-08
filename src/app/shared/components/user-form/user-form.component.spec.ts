import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createMockCredentials } from '../../../../mocks/objects/credentials.mock';
import { UserFormComponent } from './user-form.component';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatInputModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatIconModule,
      ],
      declarations: [UserFormComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    component.edit = true;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a validCredentials event on valid form values', () => {
    spyOn(component.validCredentials, 'emit');
    const credentials = createMockCredentials()[0];
    const { email, password } = credentials;
    component.formGroup.controls['email'].setValue(email);
    component.formGroup.controls['password'].setValue(password);
    component.formGroup.controls['confirmPassword'].setValue(password);
    expect(component.validCredentials.emit)
      .toHaveBeenCalledWith({ email, password });
  });

  describe('email control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['email'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should validate max length', (() => {
      const control = component.formGroup.controls['email'];
      control.setValue(
        'Lorem.ipsum.dolor.sit.amet.consectetuer.adipiscing.elit.Aenean.commodo.ligula.eget.dolor.Aenean.massa.Cum.sociis.natoque.penatibus.et.magnis.dis.parturient.montes.nascetur.ridiculus.mus.Donec.quam.felis.ultricies.nec.pellentesque.eu.pretium.quis.Lorem.ipsum.@gmailcom');
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
      control.setValue('mock@gmail.com');
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
      component.edit = false;
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
      control.setValue(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis');
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
