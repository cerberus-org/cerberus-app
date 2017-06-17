import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  // declare FormGroup
  volunteerForm: FormGroup; 
  // used to populate placeholders and set form controls
  form = [
    {placeholder: "First", control: "first"},
    {placeholder: "Last", control: "last"},
    {placeholder: "Favorite Pet Name", control: "pet"}
  ]
  
  constructor(private fb: FormBuilder) { 
    this.createForm();
  } 
  
  ngOnInit() {   
    // get submit button 
    let submitBtn = document.getElementById("submitBtn");
    // register submit button as an Observable
    let click = Observable.fromEvent(submitBtn, "click");
    // register Observerable with Observer
    click.subscribe(e => console.log(JSON.stringify(this.volunteerForm.value)));
  } 
  
  // use FormBuilder to define FormGroup 
  createForm() {
    this.volunteerForm = this.fb.group({
      // list form controls
      first: '',
      last: '',
      pet: ''
    });
  }
}
