import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AppActions from '../../actions/app.actions';
import * as LoginActions from '../../actions/login.actions';
import { HeaderOptions } from '../../models';
import { State } from '../../reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Cerberus',
    'group_work',
    null,
    true,
  );

  loginForm: FormGroup;
  error: string;
  hidePwd: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private store: Store<State>) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
    this.hidePwd = true;

    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }

  onLogin() {
    this.store.dispatch(new LoginActions.LogIn({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    }));
  }

  onNewOrganization() {
    this.router.navigateByUrl('/start');
  }
}
