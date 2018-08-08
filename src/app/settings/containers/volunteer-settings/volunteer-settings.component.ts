import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getVolunteersForSelectedTeam } from '../../../core/selectors/volunteers.selectors';
import { ColumnOptions, Volunteer } from '../../../shared/models';
import { DeleteVolunteer } from '../../actions/settings.actions';

@Component({
  selector: 'app-volunteer-settings',
  templateUrl: './volunteer-settings.component.html',
  styleUrls: ['./volunteer-settings.component.scss'],
})
export class VolunteerSettingsComponent implements OnInit {
  columnOptions: ColumnOptions[] = [
    {
      columnDef: 'name',
      header: 'Name',
      cell: (row: Volunteer) => row.name,
    },
    {
      columnDef: 'petName',
      header: 'Pet Name',
      cell: (row: Volunteer) => row.petName,
    },
  ];
  volunteers$: Observable<Volunteer[]>;

  constructor(public store$: Store<AppState>) {}

  ngOnInit(): void {
    this.volunteers$ = this.store$.pipe(select(getVolunteersForSelectedTeam));
  }

  /**
   * Handles deleteVolunteer events by dispatching DeleteVolunteer.
   *
   * @param {Volunteer} volunteer
   */
  onDeleteVolunteer(volunteer: Volunteer) {
    this.store$.dispatch(new DeleteVolunteer({ volunteer }));
  }
}
