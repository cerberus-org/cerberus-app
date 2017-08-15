import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdListModule } from '@angular/material';
import 'hammerjs';

import { LoginComponent } from './login.component';
import { MockUserService, UserService } from '../services/user.service';
import { MockVisitService, VisitService } from '../services/visit.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  class MockRouter {
    navigateByUrl = jasmine.createSpy('navigateByUrl');
  }

  let mockRouter: MockRouter;

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MdInputModule,
        MdListModule,
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useClass: MockUserService },
        { provide: VisitService, useClass: MockVisitService }
      ]
    })
      .compileComponents();
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
