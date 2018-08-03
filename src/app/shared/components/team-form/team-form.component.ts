import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { isURL } from 'validator';
import { Organization } from '../../models';

@Component({
  selector: 'app-team-form',
  template: `
    <form class="input-container" [formGroup]="formGroup">
      <mat-form-field class="input-container__row">
        <input
          matInput
          class="capitalize"
          formControlName="name"
          maxlength="70"
          placeholder="Team name"
        >
      </mat-form-field>
      <mat-form-field class="input-container__row">
        <input
          matInput
          formControlName="website"
          maxlength="255"
          placeholder="Website"
        >
      </mat-form-field>
      <mat-form-field class="input-container__row">
        <textarea
          matInput
          formControlName="description"
          maxlength="160"
          placeholder="Short description"
          #description
        >
        </textarea>
        <mat-hint align="end">{{description.value.length}} / 160</mat-hint>
      </mat-form-field>
    </form>
  `,
  styleUrls: ['./team-form.component.scss'],
})
export class TeamFormComponent implements OnInit, OnDestroy {
  @Output() validTeam = new EventEmitter();
  @Input() initialTeam: Organization;
  formGroup: FormGroup;
  formSubscription: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // If validTeam was passed in, pre populate form, else leave blank
    const nameRegex = /^[a-z ,.'-]+$/i;
    this.formGroup = this.fb.group({
      name: [
        this.initialTeam ? this.initialTeam.name : '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(70),
          Validators.pattern(nameRegex),
        ],
      ],
      website: [
        this.initialTeam ? this.initialTeam.website : '',
        [
          Validators.required,
          Validators.maxLength(255),
          this.urlValidator,
        ],
      ],
      description: [
        this.initialTeam ? this.initialTeam.description : '',
        [
          Validators.required,
          Validators.maxLength(160),
        ],
      ],
    });
    this.formSubscription = this.formGroup.valueChanges.subscribe(() => {
      this.emitValidTeam();
    });
    // Emit team if initial is valid
    this.emitValidTeam();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  emitValidTeam(): void {
    const { value } = this.formGroup;
    this.validTeam.emit(
      this.formGroup.valid
        ? new Organization(value.name, value.description, value.website)
        : null,
    );
  }

  /**
   * Validates if control.value is a URL.
   * @param {AbstractControl} control
   */
  urlValidator = (control: AbstractControl): { [key: string]: any } => {
    return isURL(control.value) ? null : { invalidURL: { value: control.value } };
  }
}
