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
    // If the list of names includes the input return filtered list
    // else return list of all names
    this.filteredNames = input ? this.names.filter(s => s.toLowerCase().includes(input.toLowerCase())) : null;
  }

  getVolunteers(): void {
    this.volunteerService.getVolunteers()
      .subscribe(res => {
          for (let i in res) {
            this.names.push(res[i].firstName + ' ' + res[i].lastName + ' ' +
              res[i].petName)
          }
        },
        error => this.error = <any>error);
  }
}
