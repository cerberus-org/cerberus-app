import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Visit } from '../../models/visit';
import { Volunteer } from '../../models/volunteer';
import { VisitService } from '../../services/visit.service';
import { VolunteerService } from '../../services/volunteer.service';
import { SignatureFieldComponent } from '../../signature-field/signature-field.component';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { state, style, trigger, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-check-in-form',
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.css'],
  // Any css properties that use a trigger or are composed inside an element that uses a trigger will go here
  styles: [
    '.sig-container { border-style: dashed; border-width: .07rem; }',
    'input.capitalize { text-transform: capitalize; }',
    'button { margin-top: 1rem; }',
    'md-input-container { width: 15rem; }',
    'form { margin-top: 2rem; margin-bottom: 2rem; }'
  ],
  animations: [
    trigger('sigTrigger', [
      state('fadeIn', style({
        opacity: '1',
      })),
      transition('void => *', [
        style({ opacity: '0'}),
        animate('500ms 0s ease-in')
      ])
    ])
  ]
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
  public sigState: string;

  @ViewChildren(SignatureFieldComponent)
  public sigs: QueryList<SignatureFieldComponent>;
  @ViewChildren('sigContainer')
  public sigContainer: QueryList<ElementRef>;

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
    this.selectedVolunteer = null;
    // TODO: Figure out why routing doesn't work
    // this.router.navigateByUrl('/home');
    this.clearSigPad();
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
    const sigValidator = (control: AbstractControl): { [key: string]: any } => {
      // If there is an active visit the signature pad is valid as is
      if (this.activeVisitForVolunteer !== undefined) {
        return null;
      }
      const sig = control.value;
      // If sigs is defined and the signature pad has not been signed
      if (sig !== undefined && sig === '') {
        return { 'noSig': { sig }};
      }
    };
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, volunteerExistenceValidator]],
      petName: ['', volunteerUniqueValidator],
      signatureField: ['', sigValidator]
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
      this.activeVisitForVolunteer = nameControl.invalid || petNameControl.invalid ? null : this.findActiveVisitForVolunteer();
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
      () => this.snackBar.open('Volunteer successfully checked in!', '', {
        duration: 3000
      }),
      error => this.snackBar.open(error ? `Error checking in: ${error}` : 'Error checking in!', '', {
        duration: 3000
      }));
  }

  /**
   * Updates a visit with now as the end time.
   */
  endVisit(): void {
    this.visitService.updateRx(Object.assign({}, this.activeVisitForVolunteer, { endedAt: new Date() }));
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
  public setSigOptions() {
    this.sigs.first.signaturePad.set('penColor', 'rgb(0, 0, 0)');
    this.sigs.first.signaturePad.set('backgroundColor', 'rgb(255, 255, 255, 0)');
    this.sigs.first.signaturePad.clear(); // clearing is needed to set the background colour
  }

  public clearSigPad() {
    if (this.sigs.first !== undefined) {
      this.sigs.first.clear();
    }
  }
}
