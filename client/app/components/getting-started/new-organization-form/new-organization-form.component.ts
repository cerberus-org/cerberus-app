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

  ngOnInit() {
    this.formGroup = this.createForm();
    this.subscribeToForm(this.formGroup);
  }

  onSubmit() {
  }

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      description: ['', Validators.required],
      website: ['', Validators.required]
    });
  }

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
