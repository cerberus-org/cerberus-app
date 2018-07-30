import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { SetHeaderOptions } from '../../../core/actions/layout.actions';
import { AppState } from '../../../core/reducers';
import { Organization } from '../../../shared/models';
import { LoadTeams } from '../../actions/teams.actions';
import * as fromTeams from '../../reducers';

@Component({
  selector: 'app-teams-page',
  template: `
    <div class="wrapper">
      <div class="container container--center container--item-spacing">
        <mat-card *ngFor="let team of (teams$ | async)">
          <mat-card-title>{{team.name}}</mat-card-title>
          <mat-card-subtitle>{{team.description}}</mat-card-subtitle>
          <mat-divider></mat-divider>
          <mat-card-actions>
            <div class="container container--inline">
              <div class="container__left">
                <button mat-button color="primary">Activate check-in</button>
              </div>
              <div class="container__right">
                <button mat-icon-button color="accent"><i class="material-icons">settings</i></button>
              </div>
            </div>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styleUrls: ['./teams-page.component.scss'],
})
export class TeamsPageComponent implements OnInit {
  teams$: Observable<Organization[]>;

  constructor(private store$: Store<AppState>) {
    this.teams$ = store$.pipe(select(fromTeams.getAllTeams));
  }

  ngOnInit() {
    this.store$.dispatch(new SetHeaderOptions({
      title: 'Teams',
      icon: '',
      previousUrl: 'home',
      showSettings: false,
    }));
    this.store$.dispatch(new LoadTeams());
  }

}
