import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { isURL } from 'validator';

import { Organization } from '../../models/organization';

@Component({
  selector: 'app-new-organization-form',
  templateUrl: './new-organization-form.component.html',
  styleUrls: ['./new-organization-form.component.scss']
})
export class NewOrganizationFormComponent implements OnInit, OnDestroy {
  @Output() onValidOrganization = new EventEmitter();
  formGroup: FormGroup;
  formSubscription: Subscription;

  constructor(private fb: FormBuilder) { }

  /**
   * Creates and subscribes to the form group.
   */
  ngOnInit(): void {
    this.formGroup = this.createForm();
    this.formSubscription = this.subscribeToForm();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
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
   */
  subscribeToForm(): Subscription {
    return this.formGroup.valueChanges.subscribe(() => {
      if (this.formGroup.valid) {
        const value = this.formGroup.value;
        this.onValidOrganization.emit(
          new Organization(value.name, value.description, value.website)
        );
      }
    });
  }
}
