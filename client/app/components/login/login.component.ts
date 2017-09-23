import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { VisitService } from '../../services/visit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // declare FormGroup
  loginForm: FormGroup;
  error: string;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) {
    this.createForm();
  }

  ngOnInit() {
  }

  login() {
    this.userService.login(this.loginForm.value)
      .subscribe(res => {
          localStorage.setItem('organizationId', res.organizationId);
          localStorage.setItem('userId', res.userId);
          localStorage.setItem('token', res.token);
          this.router.navigateByUrl('/organization-dashboard');
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
