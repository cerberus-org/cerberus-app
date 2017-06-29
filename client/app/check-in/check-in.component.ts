import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { VolunteerService } from '../shared/volunteer.service';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css'],
  providers: [VolunteerService]
})
export class CheckInComponent implements OnInit {
  public error: string;
  public names: string[];
  public filteredNames: string[];
  public nameControl: FormControl;

  constructor(private volunteerService: VolunteerService) {
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
      .subscribe(changes => this.filterNames(changes));
  }

  filterNames(input: string): void {
    this.filteredNames = input ? this.names.filter(s => s.toLowerCase().includes(input.toLowerCase())) : null;
  }

  getVolunteers(): void {
    this.volunteerService.getVolunteers()
      .subscribe(volunteers => volunteers.forEach(
        volunteer => this.names.push(`${volunteer.firstName} ${volunteer.lastName} ${volunteer.petName}`)),
        error => this.error = <any>error);
  }
}
