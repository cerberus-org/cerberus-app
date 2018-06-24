import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ColumnOptions, Volunteer } from '../../../models';
import { RootState } from '../../../root/store/reducers';
import { selectModelVolunteers } from '../../../root/store/selectors/model.selectors';
import * as SettingsActions from '../../store/actions/settings.actions';

@Component({
  selector: 'app-volunteer-settings',
  templateUrl: './volunteer-settings.component.html',
  styleUrls: ['./volunteer-settings.component.scss'],
})
export class VolunteerSettingsComponent implements OnInit {
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
  volunteers$: Observable<Volunteer[]>;

  constructor(public store$: Store<RootState>) {}

  ngOnInit(): void {
    this.volunteers$ = this.store$.pipe(select(selectModelVolunteers));
  }

  /**
   * Handles deleteVolunteer events by dispatching a DeleteVolunteer action.
   * @param volunteer - the volunteer to be deleted
   */
  onDeleteVolunteer(volunteer: Volunteer) {
    this.store$.dispatch(new SettingsActions.DeleteVolunteer(volunteer));
  }
}
