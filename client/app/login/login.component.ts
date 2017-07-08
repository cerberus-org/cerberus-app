import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from '../shared/login.service';

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

  constructor(private fb: FormBuilder, private loginService: LoginService) {
    this.createForm();
  }

  ngOnInit() {
  }

  login() {

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
