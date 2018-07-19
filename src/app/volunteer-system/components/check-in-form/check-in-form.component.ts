import { animate, state as animationsState, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatRadioChange } from '@angular/material';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { findActiveVisit, getFullName, getUniqueFullNames, searchVolunteersByName } from '../../../functions';
import { Visit, Volunteer } from '../../../models';
import { SignatureFieldComponent } from '../signature-field/signature-field.component';

@Component({
  selector: 'app-check-in-form',
  templateUrl: './check-in-form.component.html',
  styleUrls: ['./check-in-form.component.scss'],
  animations: [
    trigger('fadeInTrigger', [
      animationsState('fadeIn', style({
        opacity: '1',
      })),
      transition('void => *', [
        style({ opacity: '0' }),
        animate('500ms 0s ease-in'),
      ]),
    ]),
  ],
})
export class CheckInFormComponent implements OnInit, OnDestroy {
  @Input() siteId: string;
  @Input() visits: Visit[];
  @Input() volunteers: Volunteer[];
  @Input() title: string;
  @Output() checkIn = new EventEmitter<Visit>();
  @Output() checkOut = new EventEmitter<Visit>();

  @ViewChild(FormGroupDirective) ngForm: FormGroupDirective;
  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;
  @ViewChildren(SignatureFieldComponent) signatures: QueryList<SignatureFieldComponent>;

  nameControlSubscription: Subscription;
  formGroup: FormGroup;

  matches: Volunteer[] = [];
  autocompleteNames: string[];
  activeVisit: Visit;
  selectedVolunteer: Volunteer;

  fadeInState: string;

  /**
   * Creates the form group and subscribes on construction.
   */
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.activeVisit = null;
    this.selectedVolunteer = null;
    this.formGroup = this.fb.group({
      name: ['', [Validators.required, this.nameValidator]],
      petName: ['', this.petNameValidator],
      signature: ['', this.signatureValidator],
    });
    this.nameControlSubscription = this.formGroup.controls['name'].valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.onNameChange(value);
      });
  }

  ngOnDestroy(): void {
    if (this.nameControlSubscription) {
      this.nameControlSubscription.unsubscribe();
    }
  }

  /**
   * Constructs the visit with startedAt as no, and endedAt as null,
   * emits the onCheckIn or onCheckOut events, then resets the form.
   */
  submit(): void {
    if (!this.selectedVolunteer) {
      return;
    }
    if (this.activeVisit) {
      const visit = { ...this.activeVisit, endedAt: new Date() };
      this.checkOut.emit(visit);
    } else {
      const visit = new Visit(
        this.siteId,
        this.selectedVolunteer.id,
        new Date(),
        null,
        'America/Chicago',
        this.signatures.first ? this.signatures.first.signature : null,
      );
      this.checkIn.emit(visit);
    }
  }

  // Form update flow

  /**
   * Resets the form state.
   */
  resetForm(): void {
    this.selectedVolunteer = null;
    this.matches = [];
    this.activeVisit = null;
    this.clearSignature();
    this.formGroup.controls['petName'].updateValueAndValidity();
  }

  /**
   * Updates state when the name field is changed.
   * @param {string} name
   */
  onNameChange(name: string): void {
    if (!name) {
      return;
    }
    this.autocompleteNames = getUniqueFullNames(searchVolunteersByName(this.volunteers, name));
    this.resetForm();
  }

  /**
   * Updates state when a name option is selected.
   * @param {MatAutocompleteSelectedEvent} event
   */
  onNameSelected(event: MatAutocompleteSelectedEvent): void {
    this.matches = this.volunteers
      .filter(volunteer => getFullName(volunteer).toLowerCase() === event.option.value.toLowerCase());
    if (this.matches.length === 1) {
      this.selectVolunteer(this.matches[0]);
    }
    this.formGroup.controls['name'].updateValueAndValidity();
  }

  /**
   * Updates state when a pet name is selected.
   * @param {MatRadioChange} change
   */
  onPetNameSelected(change: MatRadioChange): void {
    this.selectVolunteer(change.value);
    this.formGroup.controls['petName'].updateValueAndValidity();
    this.clearSignature();
  }

  selectVolunteer(volunteer): void {
    this.selectedVolunteer = volunteer;
    this.activeVisit = findActiveVisit(this.visits, volunteer);
  };

  // FormGroup and validators

  /**
   * Validates if a matching newVolunteer is found by name (control.value).
   * @param control
   */
  nameValidator = (control: AbstractControl): { [key: string]: any } => {
    return !control.value ? { noMatchByName: { value: control.value } } : null;
  }

  /**
   * Validates if a matching newVolunteer is found by pet name (control.value) if needed.
   * @param control
   */
  petNameValidator = (control: AbstractControl): { [key: string]: any } => {
    return this.petNameIsRequired && !control.value ? { noMatchByPetName: { value: control.value } } : null;
  }

  /**
   * Validates if a signature (control.value) has been entered if needed.
   * @param control
   */
  signatureValidator = (control: AbstractControl): { [key: string]: any } => {
    return !this.activeVisit && !control.value ? { noSignature: { value: control.value } } : null;
  }

  /**
   * Clears the signature.
   */
  clearSignature(): void {
    if (this.signatures.first) {
      this.signatures.first.clear();
    }
  }

  get petNameIsRequired(): boolean {
    return this.matches && this.matches.length > 1;
  }
}
