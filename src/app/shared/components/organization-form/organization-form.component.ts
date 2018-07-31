import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isURL } from 'validator';
import { Organization } from '../../models';

@Component({
  selector: 'app-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss'],
})
export class OrganizationFormComponent implements OnInit, OnDestroy {
  @Output() validOrganization = new EventEmitter();
  @Input() title: string;
  @Input() subtitle: string;
  @Input() initialOrganization: Organization;
  formGroup: FormGroup;
  formSubscription: Subscription;

  constructor(private fb: FormBuilder) { }

  /**
   * Creates and subscribes to the form group.
   */
  ngOnInit(): void {
    this.formGroup = this.createForm();
    this.formSubscription = this.subscribeToForm();
    // Emit Organization if form is valid after creation
    this.emitOrganizationIfValid();
  }

  emitOrganizationIfValid(): void {
    if (this.formGroup.valid) {
      const value = this.formGroup.value;
      this.validOrganization.emit(new Organization(value.name, value.description, value.website));
    } else {
      this.validOrganization.emit(null);
    }
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
  }

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    // If validOrganization was passed in, pre populate form, else leave blank
    const nameRegex = /^[a-z ,.'-]+$/i;
    return this.fb.group({
      name: [
        this.initialOrganization ? this.initialOrganization.name : '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(70),
          Validators.pattern(nameRegex),
        ],
      ],
      website: [
        this.initialOrganization ? this.initialOrganization.website : '',
        [
          Validators.required,
          Validators.maxLength(255),
          this.urlValidator,
        ],
      ],
      description: [
        this.initialOrganization ? this.initialOrganization.description : '',
        [
          Validators.required,
          Validators.maxLength(160),
        ],
      ],
    });
  }

  /**
   * Subscribes to the form group and emit a new Organization object if Organization is valid.
   */
  subscribeToForm(): Subscription {
    return this.formGroup.valueChanges.subscribe(() => {
      this.emitOrganizationIfValid();
    });
  }
}
