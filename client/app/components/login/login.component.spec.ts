import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdListModule, MdSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import 'hammerjs';

import { LoginComponent } from './login.component';
import { MockUserService, UserService } from '../../services/user.service';
import { MockVisitService, VisitService } from '../../services/visit.service';
import { testUsers } from '../../models/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MdInputModule,
        MdListModule,
        MdSnackBarModule
      ],
      providers: [
        { provide: VisitService, useClass: MockVisitService },
        { provide: UserService, useClass: MockUserService },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    spyOn(component, 'login').and.callFake(() => {
      return { token: 'token' };
    });
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('sets the local storage items', () => {
    component.setLocalStorageItems(testUsers[0], 'token');
    expect(localStorage.getItem('token')).toBe('token');
    expect(localStorage.getItem('userId')).toBe(testUsers[0]._id);
    expect(localStorage.getItem('organizationId')).toBe(testUsers[0].organizationId);
  });

  describe('email control', () => {
    it('validates requirement', () => {
      const control = component.loginForm.controls['email'];
      expect(control.valid).toBeFalsy();
      expect(control.errors).toBeTruthy();
    });

    it('validates valid email', () => {
      const control = component.loginForm.controls['email'];
      control.setValue('test@gmail.com');
      expect(control.valid).toBeTruthy();
      expect(control.errors).toBeFalsy();
    });

    it('validates email without an @ is invalid', () => {
      const control = component.loginForm.controls['email'];
      control.setValue('test');
      expect(control.valid).toBeFalsy();
      expect(control.errors).toBeTruthy();
    });

    it('validates email that ends in a period is invalid', () => {
      const control = component.loginForm.controls['email'];
      control.setValue('test@gmail.com.');
      expect(control.valid).toBeFalsy();
      expect(control.errors).toBeTruthy();
    });
  });

  describe('password control', () => {
    it('validates requirement', () => {
      const control = component.loginForm.controls['password'];
      expect(control.valid).toBeFalsy();
      expect(control.errors).toBeTruthy();
    });
  });
});
