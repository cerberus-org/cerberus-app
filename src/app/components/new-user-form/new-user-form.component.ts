import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { User } from '../../models/user';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.scss']
})
export class NewUserFormComponent implements OnInit, OnDestroy {
  @Output() validUser = new EventEmitter();
  formGroup: FormGroup;
  formSubscription: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.createForm();
    this.formSubscription = this.subscribeToForm();
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
  }

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      lastName: ['', [Validators.minLength(2), Validators.maxLength(35), Validators.required]],
      email: ['', [Validators.maxLength(255), Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8), Validators.maxLength(128), Validators.required]]
    });
  }

  subscribeToForm(): Subscription {
    return this.formGroup.valueChanges.subscribe(() => {
      if (this.formGroup.valid) {
        const value = this.formGroup.value;
        this.validUser.emit(
          new User(value.firstName, value.lastName, value.email, value.password)
        );
      }
    });
  }
}
