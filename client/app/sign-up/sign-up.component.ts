import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder } from '@angular/forms';
import { VolunteerService } from './../shared/volunteer.service'

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
    {placeholder: "First", control: "firstName"},
    {placeholder: "Last", control: "lastName"},
    {placeholder: "Favorite Pet Name", control: "petName"}
  ]
  
  constructor(private fb: FormBuilder, private volunteerService: VolunteerService) { 
    this.createForm();
  } 
  
  ngOnInit() {   
  } 
  
  addVolunteer() {
    this.volunteerService.postVolunteer(this.volunteerForm.value)
    // subscribe returned Observerable to Observer
    .subscribe(
      // log the response
      res => console.log(res),
      // else log the error
      err => console.log("An error occured posting the volunteer: " + err)
    )
    this.volunteerForm.reset();
  }
  
  // use FormBuilder to define FormGroup 
  createForm() {
    this.volunteerForm = this.fb.group({
      // list form controls
      firstName: '',
      lastName: '',
      petName: ''
    });
  }
}
