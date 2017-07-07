import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VolunteerService } from '../../shared/volunteer.service';

@Component({
  selector: 'app-new-volunteer-form',
  templateUrl: './new-volunteer-form.component.html',
  styleUrls: ['./new-volunteer-form.component.css'],
  providers: [VolunteerService]
})
export class NewVolunteerFormComponent implements OnInit {
  public error: string;
  public forms;
  public newVolunteerForm: FormGroup;

  constructor(private fb: FormBuilder, private volunteerService: VolunteerService) {
    this.createForm();
  }

  ngOnInit() { }

  addVolunteer() {
    this.volunteerService.postVolunteer(this.newVolunteerForm.value)
      .subscribe(
        res => console.log(res),
        error => this.error = <any>error);
    this.newVolunteerForm.reset();
  }

  // Use FormBuilder to define FormGroup
  createForm() {
    this.forms = [
      { placeholder: 'First', control: 'firstName' },
      { placeholder: 'Last', control: 'lastName' },
      { placeholder: 'Favorite Pet Name', control: 'petName' }
    ];
    this.newVolunteerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      petName: ['', Validators.required]
    });
  }
}
