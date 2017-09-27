import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { SnackBarService } from '../../services/snack-bar.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // declare FormGroup
  loginForm: FormGroup;
  error: string;
  users: User[];

  constructor(private fb: FormBuilder,
              private router: Router,
              private store: Store<any>,
              private snackBarService: SnackBarService,
              private userService: UserService) {
    this.createForm();
  }

  ngOnInit() {
    this.subscribeToUsers();
  }

  login() {
    this.userService.login(this.loginForm.value,
      () => this.snackBarService.welcomeBack(localStorage.getItem('userName')));
  }

  subscribeToUsers(): void {
    this.store.select<User[]>('users').subscribe(
      users => this.users = users,
      error => this.error = <any>error);
  }

  // use FormBuilder to define FormGroup
  createForm() {
    this.loginForm = this.fb.group({
      // list form controls
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  onNewOrganization() {
    this.router.navigateByUrl('/start');
  }
}
