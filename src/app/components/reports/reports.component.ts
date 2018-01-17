import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  formGroup: FormGroup;
  formSubscription: Subscription;
  @Output() validReport = new EventEmitter();

  individualVolunteerReport: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.createForm();
    this.formSubscription = this.subscribeToForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
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
    if (this.individualVolunteerReport && !control.value) {
      return { error: 'required'};
    }
  };

  /**
   * On panel close, remove form errors and input.
   */
  onPanelClose() {
    this.formGroup.reset();
  }

  emitReportIfValid(): void {
    const value = this.formGroup.value;
    if (this.individualVolunteerReport) {
      this.validReport.emit(value.volunteerName)
    }
  }

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
