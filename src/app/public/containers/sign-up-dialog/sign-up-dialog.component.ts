import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';
import { SignUp } from '../../../auth/actions/auth.actions';
import { AppState } from '../../../core/reducers';
import { Profile } from '../../../shared/models';
import { Credentials } from '../../../shared/models/credentials';

@Component({
  selector: 'app-join-team-dialog',
  template: `
    <div class="dialog">
      <div class="grid grid--center">
        <i class="material-icons icon-image">person_add</i>
        <h1 *ngIf="title">{{title}}</h1>
        <p *ngIf="subtitle" class="subtitle">{{subtitle}}</p>
        <app-profile-form (validProfile)="onValidProfile($event)"></app-profile-form>
        <app-user-form (validCredentials)="onValidCredentials($event)"></app-user-form>
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
  validProfile: Profile;

  constructor(
    private dialogRef: MatDialogRef<SignUpDialogComponent>,
    private store$: Store<AppState>,
  ) {}

  onValidCredentials(credentials: Credentials) {
    this.validCredentials = credentials;
  }

  onValidProfile(profile: Profile) {
    this.validProfile = profile;
  }

  submit() {
    this.store$.dispatch(new SignUp({ credentials: this.validCredentials, profile: this.validProfile }));
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
