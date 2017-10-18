import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatListModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

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
        MatInputModule,
        MatListModule
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
    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
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
