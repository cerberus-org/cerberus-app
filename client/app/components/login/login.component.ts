import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VisitService } from '../../services/visit.service';
import { MdSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // declare FormGroup
  loginForm: FormGroup;
  error: string;

  constructor(private fb: FormBuilder, private router: Router,
              private snackBar: MdSnackBar,
              private userService: UserService) {
    this.createForm();
  }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.loginForm.value)
      .subscribe(res => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('organizationId', res.user.organizationId);
          localStorage.setItem('userId', res.user.userId);
          this.router.navigateByUrl('/dashboard');
          this.snackBar.open(`Welcome back, ${res.user.firstName}.`, '', { duration: 3000 });
        },
        error => this.error = <any>error
      );
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
