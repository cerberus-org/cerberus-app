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
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }
}
