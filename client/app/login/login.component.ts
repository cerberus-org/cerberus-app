import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { VisitService } from '../services/visit.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // declare FormGroup
  loginForm: FormGroup;
  // used to populate placeholders and set form controls
  form = [
    { placeholder: 'Email', control: 'email' },
    { placeholder: 'Password', control: 'password' }
  ];

  constructor(public router: Router, private fb: FormBuilder, private loginService: UserService, private visitService: VisitService) {
    this.createForm();
  }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.loginForm.value)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/home');
          this.visitService.getAllRx();
        },
        err => console.log(err)
      );
  }

  // use FormBuilder to define FormGroup
  createForm() {
    this.loginForm = this.fb.group({
      // list form controls
      email: '',
      password: '',
    });
  }
}
