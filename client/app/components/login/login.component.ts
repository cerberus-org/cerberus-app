import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MdSnackBar } from '@angular/material';
import { User } from '../../models/user';
import { Store } from '@ngrx/store';

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

  constructor(private fb: FormBuilder, private router: Router,
              private snackBar: MdSnackBar,
              private userService: UserService,
              private store: Store<any>) {
    this.createForm();
  }

  ngOnInit() {
    this.subscribeToUsers();
  }

  login() {
    this.userService.login(this.loginForm.value, () => this.snackBar.open(`Welcome back, ${localStorage.getItem('userName')}.`,
      '', { duration: 3000 }));
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
