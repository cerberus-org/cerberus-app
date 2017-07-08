import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidatorFn, Validators } from '@angular/forms';
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
    const volunteerExistenceValidator = (control: AbstractControl): { [key: string]: any } => {
      const name = control.value;
      const found = this.volunteers ? this.volunteers.find(volunteer => this.formatName(volunteer) === name) : null;
      return found ? null : { 'doesNotExist': { name } };
    };
    this.nameControl = new FormControl('', [Validators.required, volunteerExistenceValidator]);
  }

  subscribeToForm(): void {
    this.nameControl.valueChanges
      .subscribe(changes => this.filterVolunteers(changes));
  }

  filterVolunteers(value: string): void {
    this.filteredVolunteers = value ? this.volunteers.filter(volunteer => volunteer.firstName.toLowerCase().includes(value.toLowerCase()) ||
    volunteer.lastName.toLowerCase().includes(value.toLowerCase())) : null;
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

  getVolunteers(): void {
    this.volunteerService.getVolunteers()
      .subscribe(volunteers => this.volunteers = volunteers,
        error => this.error = <any>error);
  }
}
