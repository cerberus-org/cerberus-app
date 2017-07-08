import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { VolunteerService } from '../../shared/volunteer.service';
import { VisitService } from '../../shared/visit.service';
import { Volunteer } from 'app/shared/volunteer';

@Component({
  selector: 'app-check-in-form',
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.css'],
})
export class CheckInFormComponent implements OnInit {
  public error: string;
  public names: string[];
  public volunteers: Volunteer[];
  public filteredVolunteers: Volunteer[];
  public nameControl: FormControl;

  constructor(private visitService: VisitService, private volunteerService: VolunteerService) {
    this.createForm();
    this.subscribeToForm();
  }

  ngOnInit(): void {
    this.names = [];
    this.getVolunteers();
  }

  createForm(): void {
    this.nameControl = new FormControl('', Validators.required);
  }

  subscribeToForm(): void {
    this.nameControl.valueChanges
      .subscribe(changes => this.filterVolunteers(changes));
  }

  filterVolunteers(input: string): void {
    this.filteredVolunteers = input ? this.volunteers.filter(volunteer => volunteer.firstName.toLowerCase().includes(input.toLowerCase()) ||
    volunteer.lastName.toLowerCase().includes(input.toLowerCase())) : null;
  }

  formatName(volunteer: Volunteer) {
    return `${volunteer.firstName} ${volunteer.lastName}`;
  }

  onSubmit(): void {
    console.log(this.nameControl.value);
    // this.visitService.postVisit(this.nameControl.value)
    //   .subscribe(
    //     res => console.log(res),
    //     error => this.error = <any>error);
    // this.nameControl.reset();
  }

  validateVolunteerName() {

  }

  getVolunteers(): void {
    this.volunteerService.getVolunteers()
      .subscribe(volunteers => this.volunteers = volunteers,
        error => this.error = <any>error);
  }
}
