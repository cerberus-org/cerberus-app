import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule,
  MatSlideToggleModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Report, testReports } from '../../models/report';
import { ReportsFormComponent } from './reports-form.component';

describe('ReportsFormComponent', () => {
  let component: ReportsFormComponent;
  let fixture: ComponentFixture<ReportsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsFormComponent ],
      imports: [
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatRadioModule,
        MatInputModule,
        NoopAnimationsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a validReport event on valid form values', () => {
    spyOn(component.validReport, 'emit');
    const start = testReports[0].startedAt;
    const end = testReports[0].endedAt;
    const period = testReports[0].period;
    const selectedReport = testReports[0].title;
    component.formGroup.controls['start'].setValue(start);
    component.formGroup.controls['end'].setValue(end);
    component.formGroup.controls['period'].setValue(period);
    component.formGroup.controls['selectedReport'].setValue(selectedReport);
    expect(component.validReport.emit).toHaveBeenCalledWith(new Report(start, end, period, selectedReport));
  });

  describe('start control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['start'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should accept a valid start date', (() => {
      const control = component.formGroup.controls['start'];
      control.setValue(testReports[0].startedAt);
      expect(control.valid).toBeTruthy();
    }));
  });

  describe('end control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['end'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should accept a valid end date', (() => {
      const control = component.formGroup.controls['end'];
      control.setValue(testReports[0].endedAt);
      expect(control.valid).toBeTruthy();
    }));
  });

  describe('period control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['period'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should accept a valid period', (() => {
      const control = component.formGroup.controls['period'];
      control.setValue(testReports[0].period);
      expect(control.valid).toBeTruthy();
    }));
  });

  describe('title control', () => {

    it('should validate requirement', (() => {
      const control = component.formGroup.controls['selectedReport'];
      expect(control.valid).toBeFalsy();
      expect(control.errors['required']).toBeTruthy();
    }));

    it('should accept a valid title', (() => {
      const control = component.formGroup.controls['selectedReport'];
      control.setValue(testReports[0].title);
      expect(control.valid).toBeTruthy();
    }));
  });
});
