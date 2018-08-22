import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getVolunteersForSelectedTeam } from '../../../core/selectors/volunteers.selectors';
import { ColumnOptions, Volunteer } from '../../../shared/models';
import { RemoveVolunteer } from '../../actions/settings.actions';

@Component({
  selector: 'app-volunteers-settings',
  template: `
    <div class="table-container">
      <app-settings-toolbar title="Volunteers"></app-settings-toolbar>
      <app-data-table
        [data$]="volunteers$"
        [columnOptions]="columnOptions"
        [showRemove]="true"
        (removeRow)="onDeleteVolunteer($event)"
      ></app-data-table>
    </div>
  `,
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
   * Handles deleteVolunteer events by dispatching RemoveVolunteer.
   *
   * @param {Volunteer} volunteer
   */
  onDeleteVolunteer(volunteer: Volunteer) {
    this.store$.dispatch(new RemoveVolunteer({ volunteer }));
  }
}
