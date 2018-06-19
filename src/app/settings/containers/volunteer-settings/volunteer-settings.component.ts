import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as SettingsActions from '../../store/settings.actions';
import { ColumnOptions, Volunteer } from '../../../models';
import { State } from '../../../reducers';

@Component({
  selector: 'app-volunteer-settings',
  templateUrl: './volunteer-settings.component.html',
  styleUrls: ['./volunteer-settings.component.scss'],
})
export class VolunteerSettingsComponent implements OnInit {
  private modelSubscription: Subscription;
  volunteers$: Observable<Volunteer[]>;
  volunteers: Volunteer[];
  volunteerTableOptions: ColumnOptions[] = [
    new ColumnOptions(
      'firstName',
      'First Name',
      (row: Volunteer) => row.firstName,
    ),
    new ColumnOptions(
      'lastName',
      'Last Name',
      (row: Volunteer) => row.lastName,
    ),
    new ColumnOptions(
      'petName',
      'Pet Name',
      (row: Volunteer) => row.petName,
    ),
  ];

  constructor(public store: Store<State>) { }

  ngOnInit() {
    this.modelSubscription = this.store.select('model')
      .subscribe((state) => {
        this.volunteers = state.volunteers;
      });
  }

  ngOnDestroy(): void {
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }

  /**
   * Handles deleteVolunteer events by dispatching a DeleteVolunteer action.
   * @param volunteer - the volunteer to be deleted
   */
  onDeleteVolunteer(volunteer: Volunteer) {
    this.store.dispatch(new SettingsActions.DeleteVolunteer(volunteer));
  }
}
