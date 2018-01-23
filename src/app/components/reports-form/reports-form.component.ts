import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Report } from '../../models/report';

@Component({
  selector: 'app-reports-form',
  templateUrl: './reports-form.component.html',
  styleUrls: ['./reports-form.component.scss']
})
export class ReportsFormComponent implements OnInit {

  formGroup: FormGroup;
  formSubscription: Subscription;
  @Output() validReport = new EventEmitter();
  reportOptions: string[];
  periods: string[];

  constructor(private fb: FormBuilder) {
    this.periods = ['Year', 'Month', 'Week', 'Day'];
    this.reportOptions = [ 'Report A', 'Report B'];
  }

  ngOnInit() {
    this.formGroup = this.createForm();
    this.formSubscription = this.subscribeToForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      period: ['', Validators.required],
      selectedReport: ['', Validators.required],
    });
  }

  /**
   * If a report option is toggled, set selectedReport control.
   * selectedReport control can not be directly set in form due to lack of support for
   * toggles in forms.
   * @param event
   * @param {string} reportOption
   */
  setReportOption(event: any, reportOption: string) {
    if (event.checked) {
      this.formGroup.controls['selectedReport'].setValue(reportOption);
    } else {
      this.formGroup.controls['selectedReport'].setValue(null);
    }
  }

  /**
   * If the form is valid emit report.
   * @returns {Subscription}
   */
  subscribeToForm(): Subscription {
    return this.formGroup.valueChanges.subscribe(() => {
      if (this.formGroup.valid) {
        const value = this.formGroup.value;
        this.validReport.emit(new Report(value.start, value.end, value.period, value.selectedReport))
      } else {
        this.validReport.emit(null);
      }
    });
  }
}
