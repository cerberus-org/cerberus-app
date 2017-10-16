import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Organization } from '../../../models/organization';
import { AppState } from '../../../reducers/index';
import * as GettingStartedActions from '../../../actions/getting-started.actions';

@Component({
  selector: 'app-new-organization-form',
  templateUrl: './new-organization-form.component.html',
  styleUrls: ['./new-organization-form.component.css']
})
export class NewOrganizationFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) { }

  /**
   * Creates and subscribes to the form group.
   */
  ngOnInit() {
    this.formGroup = this.createForm();
    this.subscribeToForm(this.formGroup);
  }

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    const nameRegex = /^[a-z ,.'-]+$/i;
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70), Validators.pattern(nameRegex)]],
      website: ['', [Validators.required, Validators.maxLength(255)]],
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
