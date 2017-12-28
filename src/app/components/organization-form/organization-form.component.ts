import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { isURL } from 'validator';

import { getLocalStorageObject } from '../../functions/localStorageObject';
import { Organization } from '../../models/organization';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit, OnDestroy {
  @Output() validOrganization = new EventEmitter();
  @Input() title: string;
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
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  /**
   * Validates if control.value is a URL.
   * @param {AbstractControl} control
   */
  urlValidator = (control: AbstractControl): { [key: string]: any } => {
    return isURL(control.value) ? null : { invalidURL: { value: control.value } };
  };

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    const nameRegex = /^[a-z ,.'-]+$/i;
    const org = getLocalStorageObject('organization');
    // If the user is logged in, pre populate form, else leave blank
    return this.fb.group({
      name: [org ? org.name : '', [Validators.required, Validators.minLength(4), Validators.maxLength(70), Validators.pattern(nameRegex)]],
      website: [org ? org.website : '', [Validators.required, Validators.maxLength(255), this.urlValidator]],
      description: [org ? org.description : '', [Validators.required, Validators.maxLength(160)]]
    });
  }

  /**
   * Subscribes to the form group to emit a new Organization object on value changes if valid.
   */
  subscribeToForm(): Subscription {
    return this.formGroup.valueChanges.subscribe(() => {
      if (this.formGroup.valid) {
        const value = this.formGroup.value;
        this.validOrganization.emit(
          new Organization(value.name, value.description, value.website)
        );
      }
    });
  }
}
