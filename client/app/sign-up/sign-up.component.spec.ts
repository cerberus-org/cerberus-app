import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
// modules
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule } from '@angular/core';
// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdAutocompleteModule, MdInputModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'hammerjs';
// volunteer service
import { HttpModule } from '@angular/http';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  let emptyForm = {
    firstName: null,
    lastName: null,
    petName: null
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MdAutocompleteModule,
        MdInputModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
      ],
      providers: [
      ]
    })
    .compileComponents()
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('form should clear on submit', (() => {
    component.addVolunteer();
    expect(component.signUpForm.value).toEqual(emptyForm);
  }));
});
