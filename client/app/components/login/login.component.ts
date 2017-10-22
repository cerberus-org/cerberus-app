import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as LoginActions from '../../actions/login.actions'
import { AppState } from '../../reducers/index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // declare FormGroup
  loginForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.loginForm = this.createForm();
  }

  onLogin() {
    this.store.dispatch(new LoginActions.Login(this.loginForm.value));
  }

  onNewOrganization() {
    this.router.navigateByUrl('/start');
  }

  createForm(): FormGroup {
    return this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }
}
