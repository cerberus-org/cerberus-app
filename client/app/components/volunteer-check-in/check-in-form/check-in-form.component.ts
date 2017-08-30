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
  @ViewChildren(SignatureFieldComponent) sigs: QueryList<SignatureFieldComponent>;
  @ViewChildren('sigContainer') sigContainer: QueryList<ElementRef>;
  error: string;
  formGroup: FormGroup;
  activeVisitForVolunteer: Visit;
  visits: Visit[];
  selectedVolunteer: Volunteer;
  volunteers: Volunteer[];
  filteredVolunteers: Volunteer[];
  filteredVolunteersByPetName: Volunteer[];
  showPetNameForm: boolean;
  sigState: string;

  /**
   * Creates the form group and subscribes on construction.
   */
  constructor(private fb: FormBuilder, private store: Store<any>, private snackBar: MdSnackBar,
              private visitService: VisitService, private volunteerService: VolunteerService, private router: Router) {
    this.createForm();
    this.subscribeToForm();
  }

  /**
   * Gets visit and volunteer data from services on initialization.
   */
  ngOnInit(): void {
    this.activeVisitForVolunteer = null;
    // Set selectedVolunteer to null so when after a new volunteer is created,
    // the signature box is intially hidden.
    this.selectedVolunteer = null;
    this.subscribeToVisits();
    this.subscribeToVolunteers();
    this.getVolunteers();
  }

  ngAfterView() {
    this.setSigOptions();
  }

  volunteerExistenceValidator = (control: AbstractControl): { [key: string]: any } => {
    const name = control.value;
    const match = this.volunteers
      ? this.volunteers.find(volunteer => this.formatName(volunteer) === name)
      : null;
    return match ? null : { 'doesNotExist': { name } };
  };

  volunteerUniqueValidator = (control: AbstractControl): { [key: string]: any } => {
    return !this.showPetNameForm || this.findVolunteerByPetName(control.value) ? null : { 'notUnique': { name } };
  };

  signatureValidator = (control: AbstractControl): { [key: string]: any } => {
    // If there is an active visit the signature pad is valid as is
    if (this.activeVisitForVolunteer !== undefined) {
      return null;
    }
    const sig = control.value;
    // If sigs is defined and the signature pad has not been signed
    if (sig !== undefined && sig === '') {
      return { 'noSig': { sig } };
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
  checkForActiveVisit = (nameControlInvalid: boolean, petNameControlInvalid: boolean) => {
    this.activeVisitForVolunteer = nameControlInvalid || petNameControlInvalid ? null : this.findActiveVisitForVolunteer();
  };

  /**
   * Filters volunteers when name value changes
   * @param changes
   * @param petNameControl
   */
  handleNameChanges = (changes, petNameControl: AbstractControl): void => {
    console.log(changes);
    this.filterVolunteers(changes);
    this.showPetNameForm = this.checkIfFilteredHaveSameName(changes);
    if (!this.showPetNameForm) {
      this.selectedVolunteer = changes && this.volunteers
        ? this.volunteers.find(volunteer => this.formatName(volunteer).toLowerCase() === changes.toLowerCase())
        : null;
      petNameControl.reset();
    }
    console.log(this.selectedVolunteer);
  };

  /**
   * Filters volunteers by pet name when petName value changes.
   * @param changes
   */
  handlePetNameChanges = (changes): void => {
    if (!this.showPetNameForm) {
      return;
    }
    this.selectedVolunteer = this.findVolunteerByPetName(changes);
    this.filterVolunteersByPetName(changes);
    this.clearSigPad();
  };

  /**
   * Subscribes to value changes in the form.
   */
  subscribeToForm(): void {
    const nameControl = this.formGroup.controls['name'];
    const petNameControl = this.formGroup.controls['petName'];
    this.formGroup.valueChanges.subscribe(() => this.checkForActiveVisit(nameControl.invalid, petNameControl.invalid));
    nameControl.valueChanges.subscribe(changes => this.handleNameChanges(changes, petNameControl));
    petNameControl.valueChanges.subscribe(this.handlePetNameChanges);
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
    // TODO: Figure out why routing doesn't work
    // this.router.navigateByUrl('/home');
    this.clearSigPad();
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
   * Gets volunteers from the data service.
   */
  getVolunteers(): void {
    this.volunteerService.getAllRx();
  }

  /**
   * Creates a new visit with now as the start time and a null end time.
   */
  startVisit(): void {
    this.visitService.createRx(
      new Visit(this.selectedVolunteer._id, new Date(), null, 'America/Chicago', this.sigs.first.signature),
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
  endVisit(): void {
    this.visitService.updateRx(Object.assign({}, this.activeVisitForVolunteer, { endedAt: new Date() }),
      () => {
        this.snackBar.open('Volunteer successfully checked out!', '', { duration: 3000 });
        this.router.navigateByUrl('/home');
      },
      error => this.snackBar.open(error ? `Error checking out: ${error}` : 'Error checking out!', '', {
        duration: 3000
      }));
  }

  /**
   * Filters volunteers by comparing against first and last names.
   * @param name
   */
  filterVolunteers(name: string): void {
    this.filteredVolunteers = name && this.volunteers
      ? this.volunteers.filter(volunteer =>
        `${volunteer.firstName.toLowerCase()} ${volunteer.lastName.toLowerCase()}`.includes(name.toLowerCase()))
      : null;
  }

  /**
   * Checks if the given pet name narrows the filtered volunteers to one.
   * @param petName
   * @returns {boolean}
   */
  filterVolunteersByPetName(petName: string): void {
    this.filteredVolunteersByPetName = petName && this.filteredVolunteers
      ? this.filteredVolunteers.filter(volunteer => volunteer.petName.toLowerCase().includes(petName.toLowerCase()))
      : null;
  }

  /**
   * Finds an active visit for the selected volunteer if one exists.
   * @returns {undefined|Visit}
   */
  findActiveVisitForVolunteer(): Visit {
    return this.visits && this.selectedVolunteer
      ? this.visits.find(visit => visit.endedAt === null && this.selectedVolunteer._id === visit.volunteerId)
      : null;
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

  /**
   * Set signature pad properites.
   */
  setSigOptions() {
    this.sigs.first.signaturePad.set('penColor', 'rgb(0, 0, 0)');
    this.sigs.first.signaturePad.set('backgroundColor', 'rgb(255, 255, 255, 0)');
    this.sigs.first.signaturePad.clear(); // clearing is needed to set the background colour
  }

  clearSigPad() {
    if (this.sigs.first !== undefined) {
      this.sigs.first.clear();
    }
  }

  /**
   * Formats the name of a volunteer as one string.
   * @param volunteer
   * @returns {string}
   */
  formatName(volunteer: Volunteer) {
    return `${volunteer.firstName} ${volunteer.lastName}`;
  }
}
