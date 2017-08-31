import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-organization-form',
  templateUrl: './new-organization-form.component.html',
  styleUrls: ['./new-organization-form.component.css']
})
export class NewOrganizationFormComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.createForm();
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
}
