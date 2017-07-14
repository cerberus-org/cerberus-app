import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VolunteerService } from '../../shared/volunteer.service';
import { VisitService } from '../../shared/visit.service';
import { Volunteer } from 'app/shared/volunteer';
import { Visit } from '../../shared/visit';

@Component({
  selector: 'app-check-in-form',
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.css'],
})
export class CheckInFormComponent implements OnInit {
  public error: string;
  public formGroup: FormGroup;
  public activeVisitForVolunteer: Visit;
  public visits: Visit[];
  public selectedVolunteer: Volunteer;
  public volunteers: Volunteer[];
  public filteredVolunteers: Volunteer[];
  public filteredVolunteersByPetName: Volunteer[];
  public showPetNameForm: boolean;

  constructor(private fb: FormBuilder, private visitService: VisitService, private volunteerService: VolunteerService) {
    this.createForm();
    this.subscribeToForm();
  }

  ngOnInit(): void {
    this.getVisits();
    this.getVolunteers();
  }

  onSubmit(): void {
    if (this.activeVisitForVolunteer) {
      this.endVisit();
    } else {
      this.startVisit();
    }
  }

  /**
   * Formats the name of a volunteer as one string.
   * @param volunteer
   * @returns {string}
   */
  private formatName(volunteer: Volunteer) {
    return `${volunteer.firstName} ${volunteer.lastName}`;
  }

  /**
   * Creates the form group.
   */
  private createForm(): void {
    const volunteerExistenceValidator = (control: AbstractControl): { [key: string]: any } => {
      const name = control.value;
      const match = this.volunteers ? this.volunteers.find(volunteer => this.formatName(volunteer) === name) : null;
      if (!this.showPetNameForm) {
        // Select volunteer in validator since validators fire before subscription
        this.selectedVolunteer = match;
      }
      return match ? null : { 'doesNotExist': { name } };
    };
    const volunteerUniqueValidator = (control: AbstractControl): { [key: string]: any } => {
      const match = this.getVolunteerByPetName(control.value);
      // Select volunteer in validator since validators fire before subscription
      this.selectedVolunteer = match;
      return match || !this.showPetNameForm ? null : { 'notUnique': { name } };
    };
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, volunteerExistenceValidator]],
      petName: ['', volunteerUniqueValidator]
    });
  }

  /**
   * Subscribes to value changes in the form.
   */
  private subscribeToForm(): void {
    // Always check for an active visit
    this.formGroup.valueChanges.subscribe(() => {
      this.activeVisitForVolunteer = this.formGroup.invalid ? null : this.findActiveVisitForVolunteer();
    });
    // Filter volunteers when name value changes
    this.formGroup.controls['name'].valueChanges.subscribe(changes => {
      this.filterVolunteers(changes);
      this.showPetNameForm = this.checkIfNamesMatch(changes);
    });
    // Filter volunteers by pet name when petName value changes
    this.formGroup.controls['petName'].valueChanges.subscribe(changes => {
      if (this.showPetNameForm) {
        this.filterVolunteersByPetName(changes);
      }
    });
  }

  /**
   * Gets visits from the data service. TODO: Only retrieve visits from last 24 hours
   */
  private getVisits(): void {
    this.visitService.getAll()
      .subscribe(
        visits => this.visits = visits,
        error => this.error = <any>error);
  }

  /**
   * Creates a new visit with now as the start time and a null end time.
   */
  private startVisit(): void {
    this.visitService.create(new Visit(this.selectedVolunteer._id, new Date(), null, 'America/Chicago'))
      .subscribe(
        res => console.log(res),
        error => this.error = <any>error);
  }

  /**
   * Updates a visit with now as the end time.
   */
  private endVisit(): void {
    this.visitService.update(Object.assign({}, this.activeVisitForVolunteer, { endedAt: new Date() }))
      .subscribe(
        res => console.log(res),
        error => this.error = <any>error);
  }

  /**
   * Gets volunteers from the data service.
   */
  private getVolunteers(): void {
    this.volunteerService.getAll()
      .subscribe(volunteers => this.volunteers = volunteers,
        error => this.error = <any>error);
  }

  /**
   * Finds an active visit for the selected volunteer if one exists.
   * @returns {undefined|Visit}
   */
  private findActiveVisitForVolunteer(): Visit {
    return this.visits.find(visit => visit.endedAt === null && this.selectedVolunteer._id === visit.volunteerId);
  }

  /**
   * Filters volunteers by comparing against first and last names.
   * @param name
   */
  private filterVolunteers(name: string): void {
    this.filteredVolunteers = name
      ? this.volunteers.filter(
        volunteer => `${volunteer.firstName.toLowerCase()} ${volunteer.lastName.toLowerCase()}`.includes(name.toLowerCase()))
      : null;
  }

  /**
   * Checks if the given pet name narrows the filtered volunteers to one.
   * @param petName
   * @returns {boolean}
   */
  private filterVolunteersByPetName(petName: string): void {
    this.filteredVolunteersByPetName = this.filteredVolunteers
      ? this.filteredVolunteers.filter(volunteer => volunteer.petName.includes(petName))
      : null;
  }

  /**
   * Gets a unique volunteer using a pet name (no two volunteers of the first and last names can have the same pet name).
   * @param petName
   * @returns {boolean}
   */
  private getVolunteerByPetName(petName: string): Volunteer {
    return this.filteredVolunteers
      ? this.filteredVolunteers.find(volunteer => volunteer.petName === petName)
      : null;
  }

  /**
   * Checks if the filtered volunteers contain more than one volunteer of the same name.
   * @param name
   * @returns {boolean}
   */
  private checkIfNamesMatch(name: string): boolean {
    return this.filteredVolunteers && this.filteredVolunteers.length > 1
      ? this.filteredVolunteers.filter(
        volunteer => this.formatName(volunteer).toLowerCase() === name.toLowerCase()).length === this.filteredVolunteers.length
      : false;
  }
}
