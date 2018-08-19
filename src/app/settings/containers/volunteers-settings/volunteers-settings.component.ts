import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getVolunteersForSelectedTeam } from '../../../core/selectors/volunteers.selectors';
import { ColumnOptions, Volunteer } from '../../../shared/models';
import { RemoveVolunteer } from '../../actions/settings.actions';

@Component({
  selector: 'app-volunteers-settings',
  templateUrl: './volunteers-settings.component.html',
  styleUrls: ['./volunteers-settings.component.scss'],
})
export class VolunteersSettingsComponent implements OnInit {
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
   * Handles deleteVolunteer events by dispatching RemoveVolunteer.
   *
   * @param {Volunteer} volunteer
   */
  onDeleteVolunteer(volunteer: Volunteer) {
    this.store$.dispatch(new RemoveVolunteer({ volunteer }));
  }
}
