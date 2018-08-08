import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { ResetPassword, SignIn } from '../../../auth/actions/auth.actions';
import { SetSidenavOptions } from '../../../core/actions/layout.actions';
import { AppState } from '../../../core/reducers';
import { EmailDialogComponent } from '../../components/email-dialog/email-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string;
  hidePwd: boolean;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private store$: Store<AppState>,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    this.hidePwd = true;
    this.store$.dispatch(new SetSidenavOptions({ sidenavOptions: null }));
  }

  onLogin() {
    this.store$.dispatch(new SignIn({
      credentials: {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      },
    }));
  }

  /**
   * Open the dialog and subscribe to the observable that is returned on close
   * to extract the email. Once email is obtained dispatch the reset password effect.
   */
  public onForgotPassword() {
    const dialog = this.dialog.open(EmailDialogComponent);
    dialog.afterClosed().subscribe((email) => {
      if (email) {
        this.store$.dispatch(new ResetPassword({ email }));
      }
    });
  }
}
