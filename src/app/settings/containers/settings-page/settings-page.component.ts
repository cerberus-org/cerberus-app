import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as LayoutActions from '../../../core/actions/layout.actions';
import { LoadMembersForTeam } from '../../../core/actions/members.actions';
import { LoadSitesForTeam } from '../../../core/actions/sites.actions';
import { LoadTeams, SelectTeam } from '../../../core/actions/teams.actions';
import { LoadVisitsForTeam } from '../../../core/actions/visits.actions';
import { LoadVolunteersForTeam } from '../../../core/actions/volunteers.actions';
import { LoadSettingsPage } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers';
import { getSettingsSidenavOptions, getSettingsSidenavSelection } from '../../selectors/settings.selectors';

@Component({
  selector: 'app-settings-page',
  template: `
    <div [ngSwitch]="(sidenavSelection$ | async)">
      <app-user-settings
        *ngSwitchCase="'USER_SETTINGS'"
      >
      </app-user-settings>
      <app-team-settings
        *ngSwitchCase="'TEAM_SETTINGS'"
      >
      </app-team-settings>
      <app-volunteer-settings
        *ngSwitchCase="'VOLUNTEER_SETTINGS'"
      >
      </app-volunteer-settings>
      <app-roles
        *ngSwitchCase="'ROLES'"
      >
      </app-roles>
      <app-reports
        *ngSwitchCase="'REPORTS'"
      >
      </app-reports>
      <app-visits
        *ngSwitchCase="'VISITS'"
      >
      </app-visits>
      <app-site-settings
        *ngSwitchCase="'SITES'"
      >
      </app-site-settings>
    </div>
  `,
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnDestroy {
  private routeParamsSubscription: Subscription;
  private sidenavSubscription: Subscription;
  sidenavSelection$: Observable<string>;

  constructor(private route: ActivatedRoute, private store$: Store<SettingsState>) {
    store$.dispatch(new LayoutActions.SetHeaderOptions({
      title: 'Settings',
      previousUrl: 'teams',
      showLogOut: true,
    }));
    store$.dispatch(new LoadSettingsPage('USER_SETTINGS'));
    store$.dispatch(new LoadTeams());
    this.routeParamsSubscription = route.params.pipe(
      switchMap(({ teamId }) => [
        new SelectTeam({ teamId }),
        new LoadMembersForTeam({ teamId }),
        new LoadSitesForTeam({ teamId }),
        new LoadVisitsForTeam({ teamId }),
        new LoadVolunteersForTeam({ teamId }),
      ]),
    )
      .subscribe(store$);
    this.sidenavSubscription = store$.pipe(
      select(getSettingsSidenavOptions),
      map(sidenavOptions => new LayoutActions.SetSidenavOptions(sidenavOptions)),
    )
      .subscribe(store$);
    this.sidenavSelection$ = store$.pipe(select(getSettingsSidenavSelection));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.sidenavSubscription.unsubscribe();
  }
}
