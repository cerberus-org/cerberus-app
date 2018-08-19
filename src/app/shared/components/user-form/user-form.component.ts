import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/index';
import { User } from '../../models';

@Component({
  selector: 'app-user-form',
  template: `
    <form class="form-container" [formGroup]="formGroup" autocomplete="off">
      <mat-form-field class="form-container">
        <input
          matInput
          placeholder="Full Name"
          formControlName="name"
        >
      </mat-form-field>
    </form>
  `,
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Input() initialUser: User;
  @Output() validUser = new EventEmitter<User>();
  formGroup: FormGroup;
  formSubscription: Subscription;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        name: [
          this.initialUser ? this.initialUser.name : '',
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
        this.validUser.emit(new User(value.name));
      }
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }
}
