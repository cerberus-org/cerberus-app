import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { isURL } from 'validator';

import * as GettingStartedActions from '../../actions/getting-started.actions';
import { State } from '../../reducers/index';
import { Organization } from '../../models/organization';

@Component({
  selector: 'app-new-organization-form',
  templateUrl: './new-organization-form.component.html',
  styleUrls: ['./new-organization-form.component.scss']
})
export class NewOrganizationFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<State>) { }

  /**
   * Creates and subscribes to the form group.
   */
  ngOnInit() {
    this.formGroup = this.createForm();
    this.subscribeToForm(this.formGroup);
  }

  /**
   * Validates if control.value is a URL.
   * @param {AbstractControl} control
   */
  urlValidator = (control: AbstractControl): { [key: string]: any } => {
    return isURL(control.value) ? null : { 'invalidURL': { value: control.value } };
  };

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    const nameRegex = /^[a-z ,.'-]+$/i;
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70), Validators.pattern(nameRegex)]],
      website: ['', [Validators.required, Validators.maxLength(255), this.urlValidator]],
      description: ['', [Validators.required, Validators.maxLength(160)]]
    });
  }

  /**
   * Subscribes to the form group and outputs the current validity and a new Organization object if valid.
   * @param {FormGroup} group
   */
  subscribeToForm(group: FormGroup): void {
    group.valueChanges.subscribe(() => {
      const value = this.formGroup.value;
      this.store.dispatch(new GettingStartedActions.UpdateValidOrganization(group.valid
        ? new Organization(value.name, value.description, value.website)
        : null));
    });
  }
}
