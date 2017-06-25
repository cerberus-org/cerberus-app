import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit {
  // declare FormGroup
  checkInForm: FormGroup; 
  // used to populate placeholders and set form controls
  form = [
    {placeholder: "First", control: "firstName"},
    {placeholder: "Last", control: "lastName"},
    {placeholder: "Favorite Pet Name", control: "petName"}
  ]

  constructor(private fb: FormBuilder) { 
    this.createForm();
  } 

  ngOnInit() {   
  } 

  checkInVolunteer() {
    // this.volunteerService.postVolunteer(this.volunteerForm.value)
    // // subscribe returned Observerable to Observer
    // .subscribe(
    //   // log the response
    //   res => console.log(res),
    //   // else log the error
    //   err => console.log("An error occured posting the volunteer: " + err)
    // )
    this.checkInForm.reset();
  }

  // use FormBuilder to define FormGroup 
  createForm() {
    this.checkInForm = this.fb.group({
      // list form controls
      firstName: '',
      lastName: '',
      petName: ''
    });
  }
}
