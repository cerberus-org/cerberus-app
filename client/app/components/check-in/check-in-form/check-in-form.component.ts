import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state as animationsState, style, transition, trigger } from '@angular/animations';
import { Subscription } from 'rxjs/Subscription';

import { Visit } from '../../../models/visit';
import { Volunteer } from '../../../models/volunteer';
import { VisitService } from '../../../services/visit.service';
import { SignatureFieldComponent } from './signature-field/signature-field.component';
import { SnackBarService } from '../../../services/snack-bar.service';
import { State } from '../../../reducers/index';
import { Observable } from 'rxjs/Observable';
import { FilterByName, FilterByPetName } from '../../../actions/volunteers.actions';

@Component({
  selector: 'app-check-in-form',
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.css'],
  animations: [
    trigger('sigTrigger', [
      animationsState('fadeIn', style({
        opacity: '1',
      })),
      transition('void => *', [
        style({ opacity: '0' }),
        animate('500ms 0s ease-in')
      ])
    ])
  ]
})
export class CheckInFormComponent implements OnInit, OnDestroy {

  @ViewChildren(SignatureFieldComponent) signatures: QueryList<SignatureFieldComponent>;
  volunteers$: Observable<State['volunteers']>;
  visitsSubscription: Subscription;
  volunteersSubscription: Subscription;
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
  constructor(private route: ActivatedRoute,
              private fb: FormBuilder,
              private store: Store<State>,
              private snackBarService: SnackBarService,
              private visitService: VisitService,
              private router: Router) {
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
    this.volunteers$ = this.store.select('volunteers');
    this.visitsSubscription = this.subscribeToVisits();
    this.volunteersSubscription = this.subscribeToVolunteers();
  }

  ngOnDestroy(): void {
    this.visitsSubscription.unsubscribe();
    this.volunteersSubscription.unsubscribe();
  }

  ngAfterView() {
    this.setSignatureOptions();
  }

  /**
   * Subscribes visits in the store. TODO: Only retrieve visits from last 24 hours
   */
  subscribeToVisits(): Subscription {
    return this.store.select('visits').subscribe(
      state => this.visits = state.visits,
      error => this.error = <any>error);
  }

  /**
   * Subscribes volunteers in the store
   */
  subscribeToVolunteers(): Subscription {
    return this.store.select('volunteers').subscribe(
      state => {
        this.volunteers = state.volunteers;
        this.selectedVolunteer = state.selected;
        this.showPetNameForm = state.filteredHasManyWithSameName;
      },
      error => this.error = <any>error);
  }

  /**
   * Validates if a matching volunteer is found by name (control.value).
   * @param {AbstractControl} control
   */
  nameValidator = (control: AbstractControl): { [key: string]: any } => {
    return this.selectedVolunteer ? null : { 'noMatchByName': { name } };
  };

  /**
   * Validates if a matching volunteer is found by pet name (control.value).
   * @param {AbstractControl} control
   */
  petNameValidator = (control: AbstractControl): { [key: string]: any } => {
    return !this.showPetNameForm || (this.showPetNameForm && this.selectedVolunteer) ? null : { 'noMatchByPetName': { name } };
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
      name: ['', [Validators.required, this.nameValidator]],
      petName: ['', this.petNameValidator],
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
   * Subscribes to value changes in the form.
   */
  subscribeToForm(): void {
    const nameControl = this.formGroup.controls['name'];
    const petNameControl = this.formGroup.controls['petName'];
    this.formGroup.valueChanges.subscribe(() => {
      this.activeVisitForVolunteer = nameControl.invalid || petNameControl.invalid
        ? null
        : this.checkForActiveVisit(this.visits, this.selectedVolunteer);
      this.clearSignature();

    });
    nameControl.valueChanges.subscribe(changes => {
      this.store.dispatch(new FilterByName(changes));
      if (!this.showPetNameForm) {
        petNameControl.reset();
      }
    });
    petNameControl.valueChanges.subscribe(changes => this.store.dispatch(new FilterByPetName(changes)));
  }

  /**
   * Starts or ends a visit and resets the form group on clicking the submit button.
   */
  onSubmit(): void {
    if (this.activeVisitForVolunteer) {
      this.endVisit(this.activeVisitForVolunteer);
    } else if (this.selectedVolunteer) {
      this.startVisit(
        localStorage.getItem('organizationId'),
        this.route.snapshot.paramMap.get('id'),
        this.selectedVolunteer,
        this.signatures.first.signature);
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
  startVisit(organizationId: string, siteId: string, volunteer: Volunteer, signature: any): void {
    this.visitService.createRx(
      new Visit(organizationId, siteId, volunteer._id, new Date(), null, 'America/Chicago', signature),
      () => {
        this.snackBarService.checkInSuccess();
        this.router.navigateByUrl('/dashboard');
      }
    );
  }

  /**
   * Updates a visit with now as the end time.
   */
  endVisit(visit: Visit): void {
    this.visitService.updateRx(Object.assign({}, visit, { endedAt: new Date() }),
      () => {
        this.snackBarService.checkOutSuccess();
        this.router.navigateByUrl('/dashboard');
      }
    );
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
   * Assigns signature to existing signature passed in. The signature will be displayed in the signature pad once set.
   * @param signature
   */
  setSignature(signature): void {
    this.signatures.first.signature.setSignatureToExistingSignature(signature);
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
