import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { VolunteerService } from '../../shared/volunteer.service';

@Component({
  selector: 'app-new-volunteer-form',
  templateUrl: './new-volunteer-form.component.html',
  styleUrls: ['./new-volunteer-form.component.css'],
  providers: [VolunteerService]
})
export class NewVolunteerFormComponent implements OnInit {
  // declare FormGroup
  newVolunteerForm: FormGroup;
  // used to populate placeholders and set form controls
  form = [
    { placeholder: 'First', control: 'firstName' },
    { placeholder: 'Last', control: 'lastName' },
    { placeholder: 'Favorite Pet Name', control: 'petName' }
  ];

  constructor(private fb: FormBuilder, private volunteerService: VolunteerService) {
    this.createForm();
  }

  ngOnInit() {
  }

  addVolunteer() {
    this.volunteerService.postVolunteer(this.newVolunteerForm.value)
    // subscribe returned Observerable to Observer
      .subscribe(
        // log the response
        res => console.log(res),
        // else log the error
        err => console.log('An error occured posting the volunteer: ' + err)
      );
    this.newVolunteerForm.reset();
  }

  // use FormBuilder to define FormGroup
  createForm() {
    this.newVolunteerForm = this.fb.group({
      // list form controls
      firstName: '',
      lastName: '',
      petName: ''
    });
  }
}
