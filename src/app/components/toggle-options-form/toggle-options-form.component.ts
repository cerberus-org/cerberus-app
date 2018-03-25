import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggle } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-toggle-options-form',
  templateUrl: './toggle-options-form.component.html',
  styleUrls: ['./toggle-options-form.component.scss']
})
export class ToggleOptionsFormComponent implements OnInit {

  @Output() selectedToggleOption = new EventEmitter();
  @Input() toggleOptions: string[];

  formGroup: FormGroup;
  formSubscription: Subscription;
  toggles: MatSlideToggle[];

  constructor(private fb: FormBuilder) {
    this.toggles = [];
  }

  ngOnInit() {
    this.formGroup = this.createForm();
    this.formSubscription = this.subscribeToForm();
  }

  createForm(): FormGroup {
    return this.fb.group({
      selectedToggleOption: ['', Validators.required],
    });
  }

  /**
   * If a selected option is toggled, set selectedOption control.
   * selectedOption control can not be directly set in form due to lack of support for
   * toggles in forms.
   * @param event
   * @param {string} selectedOption
   */
  setSelectedToggleOption(event: any, selectedToggleOption: string) {
    if (event.source && event.checked) {
      this.formGroup.controls['selectedToggleOption'].setValue(selectedToggleOption);
      // Keep track of toggles, duplicates will not be stored
      this.toggles.push(event.source);
      this.deselectToggles(event.source);
    } else {
      this.formGroup.controls['selectedToggleOption'].setValue(null);
    }
  }

  /**
   * If there is a toggle that is checked and it is not the recently selected toggle,
   * set to unchecked to create accordian effect.
   * @param {MatSlideToggle} selectedToggle
   */
  deselectToggles(selectedToggleOption: MatSlideToggle) {
    for (const toggle of this.toggles) {
      if (toggle.checked && toggle.id !== selectedToggleOption.id) {
        toggle.checked = false;
      }
    }
  }

  /**
   * If the form is valid emit selected toggle option.
   * @returns {Subscription}
   */
  subscribeToForm(): Subscription {
    return this.formGroup.valueChanges.subscribe(() => {
      if (this.formGroup.valid) {
        const value = this.formGroup.value;
        this.selectedToggleOption.emit(value.selectedToggleOption);
      } else {
        this.selectedToggleOption.emit(null);
      }
    });
  }
}
