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
import { MatAutocomplete, MatRadioChange } from '@angular/material';
import { Subscription } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import {
  everyVolunteerMatchesName,
  filterVolunteersByName,
  findActiveVisit,
  findVolunteerByFullName,
  findVolunteerByPetName,
  getUniqueFullNames,
} from '../../../functions';
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

  filteredVolunteers: Volunteer[];
  autocompleteNames: string[];
  showPetNameForm: boolean;
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
    this.ngForm.resetForm();
  }

  // Form update flow

  /**
   * Resets the form state.
   */
  resetForm(): void {
    this.selectedVolunteer = null;
    this.clearSignature();
    this.formGroup.controls['petName'].updateValueAndValidity();
  }

  /**
   * Updates filtered lists and selected data.
   * Called in nameValidator because validator executes before formGroup value changes.
   * @param name - string used to filter volunteers by name
   */
  onNameChange(name: string): void {
    this.resetForm();
    // Create the list of filtered volunteers by name
    this.filteredVolunteers = filterVolunteersByName(this.volunteers, name);
    this.autocompleteNames = getUniqueFullNames(this.filteredVolunteers);
    // If multiple volunteers all match the name, set to true
    this.showPetNameForm = this.filteredVolunteers.length > 1
      && everyVolunteerMatchesName(this.filteredVolunteers, name);
    // If one newVolunteer remains, select the newVolunteer that exactly matches the name
    if (!this.showPetNameForm) {
      this.selectedVolunteer = findVolunteerByFullName(this.filteredVolunteers, name);
    }
    this.activeVisit = this.selectedVolunteer ? findActiveVisit(this.visits, this.selectedVolunteer) : null;
    this.formGroup.controls['name'].updateValueAndValidity();
  }

  /**
   * Updates state when a pet name is selected.
   * @param change
   */
  onPetNameChange(change: MatRadioChange): void {
    this.selectedVolunteer = findVolunteerByPetName(this.filteredVolunteers, change.value);
    this.formGroup.controls['petName'].updateValueAndValidity();
  }

  // FormGroup and validators

  /**
   * Validates if a matching newVolunteer is found by name (control.value).
   * @param control
   */
  nameValidator = (control: AbstractControl): { [key: string]: any } => {
    return this.selectedVolunteer || this.showPetNameForm ? null : { noMatchByName: { value: control.value } };
  }

  /**
   * Validates if a matching newVolunteer is found by pet name (control.value) if needed.
   * @param control
   */
  petNameValidator = (control: AbstractControl): { [key: string]: any } => {
    return !this.showPetNameForm || this.selectedVolunteer ? null : { noMatchByPetName: { value: control.value } };
  }

  /**
   * Validates if a signature (control.value) has been entered if needed.
   * @param control
   */
  signatureValidator = (control: AbstractControl): { [key: string]: any } => {
    return this.activeVisit || control.value ? null : { noSignature: { value: control.value } };
  }

  /**
   * Clears the signature.
   */
  clearSignature(): void {
    if (this.signatures.first) {
      this.signatures.first.clear();
    }
  }
}
