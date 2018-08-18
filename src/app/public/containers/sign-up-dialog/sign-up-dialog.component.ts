import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { SignUp } from '../../../auth/actions/auth.actions';
import { AppState } from '../../../core/reducers';
import { User } from '../../../shared/models';
import { Credentials } from '../../../shared/models/credentials';

@Component({
  selector: 'app-join-team-dialog',
  template: `
    <mat-dialog-content>
      <div class="grid grid--center">
        <i class="material-icons icon-image">person_add</i>
        <h2>{{title}}</h2>
        <p class="subtitle">{{subtitle}}</p>
        <app-user-form (validUser)="onValidUser($event)"></app-user-form>
        <app-credentials-form (validCredentials)="onValidCredentials($event)"></app-credentials-form>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close color="primary">
        Cancel
      </button>
      <button mat-button mat-dialog-close color="primary" [disabled]="!validCredentials" (click)="submit()">
        Confirm
      </button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./sign-up-dialog.component.scss'],
})
export class SignUpDialogComponent {
  title = 'Sign up';
  subtitle = 'You can create and join teams after you sign in.';
  validCredentials: Credentials;
  validUser: User;

  constructor(
    private dialogRef: MatDialogRef<SignUpDialogComponent>,
    private store$: Store<AppState>,
  ) {}

  onValidCredentials(credentials: Credentials) {
    this.validCredentials = credentials;
  }

  onValidUser(user: User) {
    this.validUser = user;
  }

  submit() {
    this.store$.dispatch(new SignUp({ credentials: this.validCredentials, user: this.validUser }));
  }
}
