import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // declare FormGroup
  loginForm: FormGroup;
  error: string;

  constructor(private router: Router, private fb: FormBuilder, private loginService: UserService) {
    this.createForm();
  }

  ngOnInit() {
  }

  getVisitsByDate(daysToSubtract: number): void {
    this.visitService.getByDateRx(new Date(new Date().getTime() - (daysToSubtract * 24 * 60 * 60 * 1000)));
  }

  login() {
    this.loginService.login(this.loginForm.value)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/organization-dashboard');
          this.getVisitsByDate(7);
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
}
