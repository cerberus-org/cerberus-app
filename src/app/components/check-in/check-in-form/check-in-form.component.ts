import { animate, state as animationsState, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as CheckInActions from '../../../actions/check-in.actions';
import { AppState } from '../../../reducers/index';
import { Visit } from '../../../models/visit';
import { Volunteer } from '../../../models/volunteer';
import { SignatureFieldComponent } from './signature-field/signature-field.component';
import { getLocalStorageObjectProperty } from '../../../functions/localStorageObject';

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
  checkInSubscription: Subscription;
  formGroupSubscription: Subscription;
  formGroup: FormGroup;
  nameControl: AbstractControl;
  petNameControl: AbstractControl;

  visits: Visit[];
  volunteers: Volunteer[];
  filteredVolunteers: Volunteer[];
  volunteerNames: string[];
  showPetNameForm: boolean;
  activeVisit: Visit;
  selectedVolunteer: Volunteer;

  signatureState: string;

  /**
   * Creates the form group and subscribes on construction.
   */
  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.activeVisit = null;
    this.selectedVolunteer = null;

    this.checkInSubscription = this.store
      .select('checkIn')
      .subscribe(state => {
        this.visits = state.visits;
        this.volunteers = state.volunteers;
        this.filteredVolunteers = state.filteredVolunteers;
        this.volunteerNames = state.filteredUniqueNames;
        this.showPetNameForm = state.filteredAllMatchSameName;
        this.activeVisit = state.selectedVisit;
        this.selectedVolunteer = state.selectedVolunteer;
      });

    this.formGroup = this.createForm();
    this.nameControl = this.formGroup.controls['name'];
    this.petNameControl = this.formGroup.controls['petName'];

    this.formGroupSubscription = this.formGroup.valueChanges
      .subscribe(() => this.store
        .dispatch(new CheckInActions.SelectActiveVisitForVolunteer(this.selectedVolunteer)));
  }

  ngOnDestroy(): void {
    this.checkInSubscription.unsubscribe();
    this.formGroupSubscription.unsubscribe();
  }

  ngAfterView() {
    this.setSignatureOptions();
  }

  /**
   * Updates state when a pet name is selected.
   * @param {string} petName
   */
  onPetNameClick(petName: string): void {
    this.store.dispatch(new CheckInActions.SelectVolunteerByPetName(petName));
  }

  /**
   * Starts or ends a visit and resets the form group on clicking the submit button.
   */
  onSubmit(): void {
    if (this.activeVisit) {
      this.checkOut();
    } else if (this.selectedVolunteer) {
      this.checkIn();
    }
    this.formGroup.reset();
    this.formGroup.markAsPristine();
    this.formGroup.markAsUntouched();
    this.formGroup.updateValueAndValidity();
    this.clearSignature();
  }

  /**
   * Constructs the visit with startedAt as now and endedAt as null
   * then dispatches the CheckIn action.
   */
  checkIn(): void {
    const visit = new Visit(
      getLocalStorageObjectProperty('organization', 'id'),
      this.activatedRoute.snapshot.paramMap.get('id'),
      this.selectedVolunteer.id,
      new Date(),
      null,
      'America/Chicago',
      this.signatures.first.signature
    );
    this.store.dispatch(new CheckInActions.CheckIn(visit));
  }

  /**
   * Constructs the visit with endedAt as null
   * then dispatches the CheckOut action.
   */
  checkOut(): void {
    const visit = Object.assign({}, this.activeVisit, { endedAt: new Date() });
    this.store.dispatch(new CheckInActions.CheckOut(visit));
  }

  /**
   * Dispatches a FilterAndSelectVolunteerByName action.
   * @param {string} name
   */
  dispatchFilterAndSelectByName(name: string): void {
    this.store.dispatch(new CheckInActions.FilterAndSelectVolunteersByName(name));
  }

  /**
   * Validates if a matching volunteer is found by name (control.value).
   * @param {AbstractControl} control
   */
  nameValidator = (control: AbstractControl): { [key: string]: any } => {
    // Update state in validator since formControl.valueChanges calls next() after validation
    // TODO: Find out how to update volunteers state outside validator
    this.dispatchFilterAndSelectByName(control.value);
    return this.selectedVolunteer || this.showPetNameForm ? null : { 'noMatchByName': { value: control.value } };
  };

  /**
   * Validates if a matching volunteer is found by pet name (control.value) if needed.
   * @param {AbstractControl} control
   */
  petNameValidator = (control: AbstractControl): { [key: string]: any } => {
    return !this.showPetNameForm || this.selectedVolunteer ? null : { 'noMatchByPetName': { value: control.value } };
  };

  /**
   * Validates if a signature (control.value) has been entered if needed.
   * @param {AbstractControl} control
   */
  signatureValidator = (control: AbstractControl): { [key: string]: any } => {
    return this.activeVisit || control.value ? null : { 'noSignature': { value: control.value } };
  };

  /**
   * Creates the form group.
   */
  createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      petName: ['', this.petNameValidator],
      signatureField: ['', this.signatureValidator]
    });
  }

  /**
   * Set signature pad properites.
   */
  setSignatureOptions(): void {
    this.signatures.first.signaturePad.set('penColor', 'rgb(0, 0, 0)');
    this.signatures.first.signaturePad.set('backgroundColor', 'rgb(255, 255, 255, 0)');
    this.signatures.first.signaturePad.clear(); // clear() is needed to set the background color
  }

  /**
   * Clears the signature.
   */
  clearSignature(): void {
    if (this.signatures.first) {
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
}
