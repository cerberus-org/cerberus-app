import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ColumnOptions, Volunteer } from '../../../core/models';
import { RootState } from '../../../root/store/reducers';
import { selectModelVolunteers } from '../../../root/store/selectors/model.selectors';
import * as SettingsActions from '../../store/actions/settings.actions';

@Component({
  selector: 'app-volunteer-settings',
  templateUrl: './volunteer-settings.component.html',
  styleUrls: ['./volunteer-settings.component.scss'],
})
export class VolunteerSettingsComponent implements OnInit {
  columnOptions: ColumnOptions[] = [
    {
      columnDef: 'firstName',
      header: 'First Name',
      cell: (row: Volunteer) => row.firstName,
    },
    {
      columnDef: 'lastName',
      header: 'Last Name',
      cell: (row: Volunteer) => row.lastName,
    },
    {
      columnDef: 'petName',
      header: 'Pet Name',
      cell: (row: Volunteer) => row.petName,
    },
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
