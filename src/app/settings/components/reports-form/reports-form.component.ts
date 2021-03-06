import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggle } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports-form',
  templateUrl: './reports-form.component.html',
  styleUrls: ['./reports-form.component.scss'],
})
export class ReportsFormComponent implements OnInit {

  formGroup: FormGroup;
  formSubscription: Subscription;
  @Output() validReport = new EventEmitter();
  reportOptions: string[];
  toggles: MatSlideToggle[];

  constructor(private fb: FormBuilder) {
    this.reportOptions = ['Visit History'];
    this.toggles = [];
  }

  ngOnInit(): void {
    this.formGroup = this.createForm();
    this.formSubscription = this.subscribeToForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
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
    if (event.source && event.checked) {
      this.formGroup.controls['selectedReport'].setValue(reportOption);
      // Keep track of toggles, duplicates will not be stored
      this.toggles.push(event.source);
      this.deselectToggles(event.source);
    } else {
      this.formGroup.controls['selectedReport'].setValue(null);
    }
  }

  /**
   * If there is a toggle that is checked and it is not the recently selected toggle,
   * set to unchecked to create accordian effect.
   * @param {MatSlideToggle} selectedToggle
   */
  deselectToggles(selectedToggle: MatSlideToggle) {
    for (const toggle of this.toggles) {
      if (toggle.checked && toggle.id !== selectedToggle.id) {
        toggle.checked = false;
      }
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
        this.validReport.emit({
          startedAt: value.start,
          endedAt: value.end,
          title: value.selectedReport,
        });
      } else {
        this.validReport.emit(null);
      }
    });
  }
}
