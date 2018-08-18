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
    <div class="dialog">
      <div class="grid grid--center">
        <i class="material-icons icon-image">person_add</i>
        <h1 *ngIf="title">{{title}}</h1>
        <p *ngIf="subtitle" class="subtitle">{{subtitle}}</p>
        <app-user-form (validUser)="onValidUser($event)"></app-user-form>
        <app-credentials-form (validCredentials)="onValidCredentials($event)"></app-credentials-form>
        <div class="actions-container">
          <button mat-button color="primary" (click)="close()">Cancel</button>
          <button mat-button color="primary" (click)="submit()" [disabled]="!validCredentials">Confirm</button>
        </div>
      </div>
    </div>
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
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
