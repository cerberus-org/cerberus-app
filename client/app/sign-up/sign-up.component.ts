import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VolunteerService } from './../volunteer.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [VolunteerService]
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
  
  constructor(private fb: FormBuilder, private volunteerService: VolunteerService) { 
    this.createForm();
  } 
  
  ngOnInit() {   
  } 
  
  addVolunteer() {
    this.volunteerService.postVolunteer(this.volunteerForm.value);
    this.volunteerForm.reset();
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
