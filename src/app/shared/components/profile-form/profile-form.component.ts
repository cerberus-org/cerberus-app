import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { Profile } from '../../models';

@Component({
  selector: 'app-profile-form',
  template: `
    <form class="input-container" [formGroup]="formGroup" autocomplete="off">
      <mat-form-field class="input-container__row">
        <input
          matInput
          placeholder="Full Name"
          formControlName="name"
        >
      </mat-form-field>
    </form>
  `,
  styleUrls: ['./profile-form.component.scss'],
})
export class ProfileFormComponent implements OnInit, OnDestroy {
  @Input() initialProfile: Profile;
  @Output() validProfile = new EventEmitter<Profile>();
  formGroup: FormGroup;
  formSubscription: Subscription;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        name: [
          this.initialProfile ? this.initialProfile.name : '',
          [
            Validators.minLength(2), Validators.maxLength(70),
            Validators.required,
          ],
        ],
      },
    );
    this.formSubscription = this.formGroup.valueChanges.subscribe(() => {
      const { valid, value } = this.formGroup;
      if (valid) {
        this.validProfile.emit(new Profile(value.name));
      }
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
