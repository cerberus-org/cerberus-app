import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { VisitService } from 'app/shared/visit.service';
import { VolunteerService } from 'app/shared/volunteer.service';
import { Visit } from 'app/shared/visit';
import { Volunteer } from 'app/shared/volunteer';

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

  /**
   * Creates the form group and subscribes on construction.
   */
  constructor(private fb: FormBuilder, private visitService: VisitService, private volunteerService: VolunteerService) {
    this.createForm();
    this.subscribeToForm();
  }

  /**
   * Gets visit and volunteer data from services on initialization.
   */
  ngOnInit(): void {
    this.getVisits();
    this.getVolunteers();
  }

  /**
   * Starts or ends a visit and resets the form group on clicking the submit button.
   */
  onSubmit(): void {
    if (this.activeVisitForVolunteer) {
      this.endVisit();
    } else if (this.selectedVolunteer) {
      this.startVisit();
    }
    this.formGroup.reset();
    // Workaround for clearing error state
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.controls[key].setErrors(null);
    });
    this.activeVisitForVolunteer = null;
    this.selectedVolunteer = null;
    this.getVisits();
  }

  /**
   * Formats the name of a volunteer as one string.
   * @param volunteer
   * @returns {string}
   */
  formatName(volunteer: Volunteer) {
    return `${volunteer.firstName} ${volunteer.lastName}`;
  }

  /**
   * Creates the form group.
   */
  createForm(): void {
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
      if (!this.showPetNameForm) {
        return null;
      }
      const match = this.findVolunteerByPetName(control.value);
      // Select volunteer in validator since validators fire before subscription
      this.selectedVolunteer = match;
      return match ? null : { 'notUnique': { name } };
    };
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, volunteerExistenceValidator]],
      petName: ['', volunteerUniqueValidator]
    });
  }

  /**
   * Subscribes to value changes in the form.
   */
  subscribeToForm(): void {
    const nameControl = this.formGroup.controls['name'];
    const petNameControl = this.formGroup.controls['petName'];
    // Always check for an active visit
    this.formGroup.valueChanges.subscribe(() => {
      this.activeVisitForVolunteer = this.formGroup.invalid ? null : this.findActiveVisitForVolunteer();
    });
    // Filter volunteers when name value changes
    nameControl.valueChanges.subscribe(changes => {
      this.filterVolunteers(changes);
      this.showPetNameForm = this.checkIfFilteredHaveSameName(changes);
      if (!this.showPetNameForm) {
        petNameControl.reset();
      }
    });
    // Filter volunteers by pet name when petName value changes
    petNameControl.valueChanges.subscribe(changes => {
      if (this.showPetNameForm) {
        this.filterVolunteersByPetName(changes);
      }
    });
  }

  /**
   * Gets visits from the data service. TODO: Only retrieve visits from last 24 hours
   */
  getVisits(): void {
    this.visitService.getAll()
      .subscribe(
        visits => this.visits = visits,
        error => this.error = <any>error);
  }

  /**
   * Gets volunteers from the data service.
   */
  getVolunteers(): void {
    this.volunteerService.getAll()
      .subscribe(volunteers => this.volunteers = volunteers,
        error => this.error = <any>error);
  }

  /**
   * Creates a new visit with now as the start time and a null end time.
   */
  startVisit(): void {
    this.visitService.create(new Visit(this.selectedVolunteer._id, new Date(), null, 'America/Chicago'))
      .subscribe(
        res => console.log(res),
        error => this.error = <any>error);
  }

  /**
   * Updates a visit with now as the end time.
   */
  endVisit(): void {
    this.visitService.update(Object.assign({}, this.activeVisitForVolunteer, { endedAt: new Date() }))
      .subscribe(
        res => console.log(res),
        error => this.error = <any>error);
  }

  /**
   * Filters volunteers by comparing against first and last names.
   * @param name
   */
  filterVolunteers(name: string): void {
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
  filterVolunteersByPetName(petName: string): void {
    this.filteredVolunteersByPetName = this.filteredVolunteers
      ? this.filteredVolunteers.filter(volunteer => volunteer.petName.includes(petName))
      : null;
  }

  /**
   * Finds an active visit for the selected volunteer if one exists.
   * @returns {undefined|Visit}
   */
  findActiveVisitForVolunteer(): Visit {
    return this.visits.find(visit => visit.endedAt === null && this.selectedVolunteer._id === visit.volunteerId);
  }

  /**
   * Finds a unique volunteer using a pet name (no two volunteers of the first and last names can have the same pet name).
   * @param petName
   * @returns {boolean}
   */
  findVolunteerByPetName(petName: string): Volunteer {
    return this.filteredVolunteers
      ? this.filteredVolunteers.find(volunteer => volunteer.petName === petName)
      : null;
  }

  /**
   * Checks if the remaining filtered volunteers all have the same name.
   * @param name
   * @returns {boolean}
   */
  checkIfFilteredHaveSameName(name: string): boolean {
    return this.filteredVolunteers && this.filteredVolunteers.length > 1
      ? this.filteredVolunteers.filter(
        volunteer => this.formatName(volunteer).toLowerCase() === name.toLowerCase()).length > 1
      : false;
  }
}
