import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Organization } from '../../../models/organization';

@Component({
  selector: 'app-new-organization-form',
  templateUrl: './new-organization-form.component.html',
  styleUrls: ['./new-organization-form.component.css']
})
export class NewOrganizationFormComponent implements OnInit {
  @Output() valid = new EventEmitter<boolean>();
  @Output() organization = new EventEmitter<Organization>();
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

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
    const websiteRegex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(70), Validators.pattern(nameRegex)]],
      website: ['', [Validators.required, Validators.maxLength(255), Validators.pattern(websiteRegex)]],
      description: ['', [Validators.required, Validators.maxLength(160)]]
    });
  }

  /**
   * Subscribes to the form group and outputs the current validity and a new Organization object if valid.
   * @param {FormGroup} group
   */
  subscribeToForm(group: FormGroup): void {
    group.valueChanges.subscribe(changes => {
      this.valid.emit(group.valid);
      if (group.valid) {
        const value = this.formGroup.value;
        this.organization.emit(new Organization(value.name, value.description, value.website));
      }
    });
  }
}
