import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import * as LayoutActions from '../../../core/actions/layout.actions';
import { SetHeaderOptions } from '../../../core/actions/layout.actions';
import { Go } from '../../../core/actions/router.actions';
import { AppState } from '../../../core/reducers';
import { Organization } from '../../../shared/models';
import { LoadTeams } from '../../actions/teams.actions';
import * as fromTeams from '../../reducers';

@Component({
  selector: 'app-teams-page',
  template: `
    <div class="wrapper">
      <div class="container container--inline">
        <div class="container__left">
          <h2 *ngIf="(teams$ | async)?.length; else noTeams">You are a member of these teams.</h2>
          <ng-template #noTeams>
            <h2>Create or join a team to get started.</h2>
          </ng-template>
        </div>
        <div class="container__right header-buttons">
          <button mat-stroked-button color="accent">Create Team</button>
          <button mat-stroked-button color="accent">Join Team</button>
        </div>
      </div>
      <mat-divider></mat-divider>
      <div class="teams-list">
        <app-team-card
          *ngFor="let team of (teams$ | async)"
          [team]="team"
          (clickActivate)="onClickActivate($event)"
          (clickSettings)="onClickSettings($event)"
        >
        </app-team-card>
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
      previousUrl: null,
      showSettings: false,
    }));
    this.store$.dispatch(new LayoutActions.SetSidenavOptions(null));
    this.store$.dispatch(new LoadTeams());
  }

  onClickActivate(team: Organization): void {
    this.store$.dispatch(new Go({ path: ['organization/dashboard'] }));
  }

  onClickSettings(team: Organization): void {
    this.store$.dispatch(new Go({ path: ['organization/settings'] }));
  }
}
