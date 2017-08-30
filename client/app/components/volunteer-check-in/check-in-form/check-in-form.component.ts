import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Visit } from '../../../models/visit';
import { Volunteer } from '../../../models/volunteer';
import { VisitService } from '../../../services/visit.service';
import { VolunteerService } from '../../../services/volunteer.service';
import { SignatureFieldComponent } from './signature-field/signature-field.component';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-check-in-form',
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.css'],
  animations: [
    trigger('sigTrigger', [
      state('fadeIn', style({
        opacity: '1',
      })),
      transition('void => *', [
        style({ opacity: '0' }),
        animate('500ms 0s ease-in')
      ])
    ])
  ]
})
export class CheckInFormComponent implements OnInit {
  @ViewChildren(SignatureFieldComponent) signatures: QueryList<SignatureFieldComponent>;
  showPetNameForm: boolean;
  error: string;
  signatureState: string;
  filteredNames: string[];
  formGroup: FormGroup;
  activeVisitForVolunteer: Visit;
  visits: Visit[];
  selectedVolunteer: Volunteer;
  volunteers: Volunteer[];
  filteredVolunteers: Volunteer[];
  filteredVolunteersByPetName: Volunteer[];

  /**
   * Creates the form group and subscribes on construction.
   */
  constructor(private fb: FormBuilder, private store: Store<any>, private snackBar: MdSnackBar,
              private visitService: VisitService, private router: Router) {
    this.createForm();
    this.subscribeToForm();
  }

  /**
   * Gets visit and volunteer data from services on initialization.
   */
  ngOnInit(): void {
    this.activeVisitForVolunteer = null;
    // Set selectedVolunteer to null so the signature box is hidden after a new volunteer is created
    this.selectedVolunteer = null;
    this.subscribeToVisits();
    this.subscribeToVolunteers();
  }

  ngAfterView() {
    this.setSignatureOptions();
  }

  /**
   * Subscribes visits in the store. TODO: Only retrieve visits from last 24 hours
   */
  subscribeToVisits(): void {
    this.store.select<Visit[]>('visits').subscribe(
      visits => this.visits = visits,
      error => this.error = <any>error);
  }

  /**
   * Subscribes volunteers in the store
   */
  subscribeToVolunteers(): void {
    this.store.select<Volunteer[]>('volunteers').subscribe(
      volunteers => this.volunteers = volunteers,
      error => this.error = <any>error);
  }

  /**
   * Validates if a matching volunteer is found by name (control value).
   * @param {AbstractControl} control
   */
  volunteerExistenceValidator = (control: AbstractControl): { [key: string]: any } => {
    const name = control.value;
    const match = this.volunteers
      ? this.volunteers.find(volunteer => this.formatName(volunteer) === name)
      : null;
    return match ? null : { 'doesNotExist': { name } };
  };

  /**
   * Validates if a matching volunteer is found by pet name (control value).
   * @param {AbstractControl} control
   */
  volunteerUniqueValidator = (control: AbstractControl): { [key: string]: any } => {
    return !this.showPetNameForm || this.findVolunteerByPetName(this.filteredVolunteers, control.value)
      ? null
      : { 'notUnique': { name } };
  };

  /**
   * Validates if a signature has been entered.
   * @param {AbstractControl} control
   */
  signatureValidator = (control: AbstractControl): { [key: string]: any } => {
    // If there is an active visit the signature pad is valid as is
    if (this.activeVisitForVolunteer !== undefined) {
      return null;
    }
    const signature = control.value;
    // If signatures is defined and the signature pad has not been signed
    if (signature !== undefined && signature === '') {
      return { 'noSignature': { signature } };
    }
  };

  /**
   * Creates the form group.
   */
  createForm(): void {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, this.volunteerExistenceValidator]],
      petName: ['', this.volunteerUniqueValidator],
      signatureField: ['', this.signatureValidator]
    });
  }

  /**
   * Checks for an active visit
   */
  checkForActiveVisit = (visits: Visit[], volunteer: Volunteer) => {
    return visits && volunteer ? this.findActiveVisitForVolunteer(visits, volunteer) : null;
  };

  /**
   * Filters volunteers when name value changes
   * @param changes
   */
  handleNameChanges = (changes): void => {
    this.filteredVolunteers = this.filterVolunteersByName(this.volunteers, changes);
    this.filteredNames = this.filterVolunteerNames(this.filteredVolunteers, changes);
    this.showPetNameForm = this.checkIfFilteredHaveSameName(changes);
    if (!this.showPetNameForm) {
      this.selectedVolunteer = changes && this.volunteers
        ? this.volunteers.find(volunteer => this.formatName(volunteer).toLowerCase() === changes.toLowerCase())
        : null;
    }
  };

  /**
   * Filters volunteers by pet name when petName value changes.
   * @param changes
   */
  handlePetNameChanges = (changes): void => {
    if (!this.showPetNameForm) {
      return;
    }
    this.selectedVolunteer = this.findVolunteerByPetName(this.filteredVolunteers, changes);
    this.filteredVolunteersByPetName = this.filterVolunteersByPetName(this.filteredVolunteers, changes);
    this.clearSignature();
  };

  /**
   * Subscribes to value changes in the form.
   */
  subscribeToForm(): void {
    const nameControl = this.formGroup.controls['name'];
    const petNameControl = this.formGroup.controls['petName'];
    this.formGroup.valueChanges.subscribe(() =>
      this.activeVisitForVolunteer = nameControl.invalid || petNameControl.invalid
        ? null
        : this.checkForActiveVisit(this.visits, this.selectedVolunteer));
    nameControl.valueChanges.subscribe(changes => {
      this.handleNameChanges(changes);
      if (!this.showPetNameForm) {
        petNameControl.reset();
      }
    });
    petNameControl.valueChanges.subscribe(this.handlePetNameChanges);
  }

  /**
   * Starts or ends a visit and resets the form group on clicking the submit button.
   */
  onSubmit(): void {
    if (this.activeVisitForVolunteer) {
      this.endVisit(this.activeVisitForVolunteer);
    } else if (this.selectedVolunteer) {
      this.startVisit(this.selectedVolunteer, this.signatures.first.signature);
    }
    this.formGroup.reset();
    // Workaround for clearing error state
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.controls[key].setErrors(null);
    });
    this.clearSignature();
  }

  /**
   * Creates a new visit with now as the start time and a null end time.
   */
  startVisit(volunteer: Volunteer, signature: any): void {
    this.visitService.createRx(
      new Visit(volunteer._id, new Date(), null, 'America/Chicago', signature),
      () => {
        this.snackBar.open('Volunteer successfully checked in!', '', { duration: 3000 });
        this.router.navigateByUrl('/home');
      },
      error => this.snackBar.open(error ? `Error checking in: ${error}` : 'Error checking in!',
        '', { duration: 3000 }));
  }

  /**
   * Updates a visit with now as the end time.
   */
  endVisit(visit: Visit): void {
    this.visitService.updateRx(Object.assign({}, visit, { endedAt: new Date() }),
      () => {
        this.snackBar.open('Volunteer successfully checked out!', '', { duration: 3000 });
        this.router.navigateByUrl('/home');
      },
      error => this.snackBar.open(error ? `Error checking out: ${error}` : 'Error checking out!', '', {
        duration: 3000
      }));
  }

  /**
   * Filters volunteers names for autocomplete by comparing against first and last names and removing duplicates.
   * @param volunteers
   * @param name
   */
  filterVolunteerNames(volunteers: Volunteer[], name: string): string[] {
    return name && volunteers
      ? Array.from(new Set(volunteers
        .filter(volunteer => this.formatName(volunteer).toLowerCase().includes(name.toLowerCase()))
        .map(volunteer => this.formatName(volunteer))))
      : null;
  }

  /**
   * Filters volunteers by comparing against first and last names.
   * @param volunteers
   * @param name
   */
  filterVolunteersByName(volunteers: Volunteer[], name: string): Volunteer[] {
    return name && volunteers
      ? volunteers.filter(volunteer => this.formatName(volunteer).toLowerCase().includes(name.toLowerCase()))
      : null;
  }

  /**
   * Checks if the given pet name narrows the filtered volunteers to one.
   * @param volunteers
   * @param petName
   * @returns {boolean}
   */
  filterVolunteersByPetName(volunteers: Volunteer[], petName: string): Volunteer[] {
    return petName && volunteers
      ? volunteers.filter(volunteer => volunteer.petName.toLowerCase().includes(petName.toLowerCase()))
      : null;
  }

  /**
   * Finds an active visit for the selected volunteer if one exists.
   * @returns {undefined|Visit}
   */
  findActiveVisitForVolunteer(visits: Visit[], volunteer: Volunteer): Visit {
    return visits && volunteer
      ? visits.find(visit => visit.endedAt === null && volunteer._id === visit.volunteerId)
      : null;
  }

  /**
   * Finds a unique volunteer using a pet name (no two volunteers of the first and last names can have the same pet name).
   * @param volunteers
   * @param petName
   * @returns {boolean}
   */
  findVolunteerByPetName(volunteers: Volunteer[], petName: string): Volunteer {
    return volunteers ? volunteers.find(volunteer => volunteer.petName === petName) : null;
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

  /**
   * Set signature pad properites.
   */
  setSignatureOptions(): void {
    this.signatures.first.signaturePad.set('penColor', 'rgb(0, 0, 0)');
    this.signatures.first.signaturePad.set('backgroundColor', 'rgb(255, 255, 255, 0)');
    this.signatures.first.signaturePad.clear(); // clearing is needed to set the background colour
  }

  clearSignature(): void {
    if (this.signatures.first !== undefined) {
      this.signatures.first.clear();
    }
  }

  /**
   * Formats the name of a volunteer as one string.
   * @param volunteer
   * @returns {string}
   */
  formatName(volunteer: Volunteer): string {
    return `${volunteer.firstName} ${volunteer.lastName}`;
  }
}
