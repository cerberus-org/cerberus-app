import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { SetHeaderOptions, SetSidenavOptions } from '../../../core/actions/layout.actions';
import { LoadMembersForTeam } from '../../../core/actions/members.actions';
import { LoadSitesForTeam } from '../../../core/actions/sites.actions';
import { LoadTeams, SelectTeam } from '../../../core/actions/teams.actions';
import { LoadVisitsForTeam } from '../../../core/actions/visits.actions';
import { LoadVolunteersForTeam } from '../../../core/actions/volunteers.actions';
import { getMemberForUserAndSelectedTeam } from '../../../core/selectors/members.selectors';
import { isAdmin } from '../../../shared/helpers';
import { LoadSettingsPage } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers';
import { getSettingsSidenavSelection } from '../../selectors/settings.selectors';

@Component({
  selector: 'app-settings-page',
  template: `
    <div [ngSwitch]="(sidenavSelection$ | async)">
      <app-user-settings
        *ngSwitchCase="'USER'"
      >
      </app-user-settings>
      <app-team-settings
        *ngSwitchCase="'TEAM'"
      >
      </app-team-settings>
      <app-volunteer-settings
        *ngSwitchCase="'VOLUNTEERS'"
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
    store$.dispatch(new SetHeaderOptions({
      headerOptions: {
        title: 'Settings',
        previousUrl: 'teams',
        showLogOut: true,
      },
    }));
    store$.dispatch(new LoadSettingsPage('USER'));
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
      select(getMemberForUserAndSelectedTeam),
      filter(member => !!member),
      map(member => new SetSidenavOptions({
        sidenavOptions: isAdmin(member) ? adminSidenavOptions : memberSidenavOptions,
      })),
    )
      .subscribe(store$);
    this.sidenavSelection$ = store$.pipe(select(getSettingsSidenavSelection));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.sidenavSubscription.unsubscribe();
  }
}

const memberSidenavOptions = [
  {
    label: 'User',
    icon: 'face',
    action: new LoadSettingsPage('USER'),
  },
];

const adminSidenavOptions = [
  ...memberSidenavOptions,
  {
    label: 'Team',
    icon: 'domain',
    action: new LoadSettingsPage('TEAM'),
  },
  {
    label: 'Sites',
    icon: 'dashboard',
    action: new LoadSettingsPage('SITES'),
  },
  {
    label: 'Visits',
    icon: 'done_all',
    action: new LoadSettingsPage('VISITS'),
  },
  {
    label: 'Volunteers',
    icon: 'insert_emoticon',
    action: new LoadSettingsPage('VOLUNTEERS'),
  },
  {
    label: 'Reports',
    icon: 'assessment',
    action: new LoadSettingsPage('REPORTS'),
  },
  {
    label: 'Roles',
    icon: 'lock_outline',
    action: new LoadSettingsPage('ROLES'),
  },
];
