import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { IndividualReport, Report } from '../../models/report';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  formGroup: FormGroup;
  formSubscription: Subscription;
  @Output() validReport = new EventEmitter();
  reports: Report[];

  constructor(private fb: FormBuilder) {
    this.reports = [
      new IndividualReport(null, null, null, 'Individual Volunteer', 'Get hours for a specific volunteer', null),
      new Report(null, null, null, 'All Volunteers', 'Get hours for all volunteers'),
    ]
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
      volunteerName: ['', this.individualVolunteerRequiredValidator]
    });
  }

  /**
   * If the individual volunteer report panel is expanded it is required.
   *
   * @param {AbstractControl} control
   * @returns {{[p: string]: any}}
   */
  individualVolunteerRequiredValidator = (control: AbstractControl): { [key: string]: any } => {
    if (this.reports[0].open && !control.value) {
      return { error: 'required' };
    }
  };

  /**
   * On panel close, remove form errors and input.
   */
  onPanelClose() {
    this.formGroup.reset();
  }

  /**
   * Determine which report to emit and emit.
   */
  emitReportIfValid(): void {
    const value = this.formGroup.value;
    if (this.reports[0].open) {
      this.validReport.emit(Object.assign({}, this.reports[0], { volunteerName: value.volunteerName, start: value.start, end: value.end, period: value.period }))
    } else if (this.reports[1].open) {
      this.validReport.emit(Object.assign({}, this.reports[1], { start: value.start, end: value.end, period: value.period }))
    }
  }

  /**
   * If the form is valid emit report.
   * @returns {Subscription}
   */
  subscribeToForm(): Subscription {
    return this.formGroup.valueChanges.subscribe(() => {
      if (this.formGroup.valid) {
        this.emitReportIfValid();
      } else {
        this.validReport.emit(null);
      }
    });
  }
}
