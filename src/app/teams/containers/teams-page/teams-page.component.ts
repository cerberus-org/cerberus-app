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
    <div class="teams-container">
      <app-team-card
        *ngFor="let team of (teams$ | async)"
        [team]="team"
        (clickActivate)="onClickActivate($event)"
        (clickSettings)="onClickSettings($event)"
      >
      </app-team-card>
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
