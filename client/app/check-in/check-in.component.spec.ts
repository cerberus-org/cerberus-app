import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckInComponent } from './check-in.component';
// modules
import { RouterTestingModule } from '@angular/router/testing';
import { NgModule } from '@angular/core';
// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import 'hammerjs';
// volunteer service
import { HttpModule } from '@angular/http';

describe('CheckInComponent', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInComponent ],
      imports: [
        RouterTestingModule,
        // angular material
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        // volunteer service
        HttpModule
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
