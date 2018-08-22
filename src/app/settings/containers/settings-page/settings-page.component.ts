import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';
import { SetHeaderOptions, SetSidenavOptions } from '../../../core/actions/layout.actions';
import { LoadMembersForTeam } from '../../../core/actions/members.actions';
import { LoadSitesForTeam } from '../../../core/actions/sites.actions';
import { LoadTeams, SelectTeam } from '../../../core/actions/teams.actions';
import { LoadUsersByIds } from '../../../core/actions/users.actions';
import { LoadVisitsForTeam } from '../../../core/actions/visits.actions';
import { LoadVolunteersForTeam } from '../../../core/actions/volunteers.actions';
import {
  getMemberForCurrentUserAndSelectedTeam,
  getUserIdsForSelectedTeam,
} from '../../../core/selectors/members.selectors';
import { isAdmin } from '../../../shared/helpers';
import { SelectSettingsOption } from '../../actions/settings.actions';
import { SettingsState } from '../../reducers';
import { getSelectedSettingsOption } from '../../selectors/settings.selectors';

@Component({
  selector: 'app-settings-page',
  template: `
    <app-loader *ngIf="loading; else loaded"></app-loader>
    <ng-template #loaded>
      <div class="container" [ngSwitch]="(selectedOption$ | async)">
        <app-member-settings *ngSwitchCase="'MEMBERS'"></app-member-settings>
        <app-site-settings *ngSwitchCase="'SITES'"></app-site-settings>
        <app-visits-settings *ngSwitchCase="'VISITS'"></app-visits-settings>
        <app-volunteers-settings *ngSwitchCase="'VOLUNTEERS'"></app-volunteers-settings>
        <app-reports *ngSwitchCase="'REPORTS'"></app-reports>
        <app-team-settings *ngSwitchCase="'TEAM'"></app-team-settings>
      </div>
    </ng-template>
  `,
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  private routeParamsSubscription: Subscription;
  private membersSubscription: Subscription;
  private sidenavSubscription: Subscription;
  selectedOption$: Observable<string>;
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private store$: Store<SettingsState>) {
    store$.dispatch(new SetHeaderOptions({
      headerOptions: {
        title: 'Settings',
        previousUrl: 'teams',
        showLogOut: true,
      },
    }));
    store$.dispatch(new SelectSettingsOption({ selectedOption: 'MEMBERS' }));
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
    this.membersSubscription = store$.pipe(
      select(getUserIdsForSelectedTeam),
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), // Only load when IDs changed
      filter(ids => ids && ids.length > 0),
      map(ids => new LoadUsersByIds({ ids })),
    )
      .subscribe(store$);
    this.sidenavSubscription = store$.pipe(
      select(getMemberForCurrentUserAndSelectedTeam),
      filter(member => !!member),
      map(member => new SetSidenavOptions({
        sidenavOptions: isAdmin(member) ? adminSidenavOptions : memberSidenavOptions,
      })),
    )
      .subscribe(store$);
    this.selectedOption$ = store$.pipe(select(getSelectedSettingsOption));
  }

  ngOnInit() {
    // Show loader for 500ms on page load
    setTimeout(
      () => {
        this.loading = false;
      },
      500,
    );
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.sidenavSubscription.unsubscribe();
  }
}

const memberSidenavOptions = [
  {
    label: 'Members',
    icon: 'group',
    action: new SelectSettingsOption({ selectedOption: 'MEMBERS' }),
  },
];

const adminSidenavOptions = [
  ...memberSidenavOptions,
  {
    label: 'Sites',
    icon: 'dashboard',
    action: new SelectSettingsOption({ selectedOption: 'SITES' }),
  },
  {
    label: 'Visits',
    icon: 'done_all',
    action: new SelectSettingsOption({ selectedOption: 'VISITS' }),
  },
  {
    label: 'Volunteers',
    icon: 'insert_emoticon',
    action: new SelectSettingsOption({ selectedOption: 'VOLUNTEERS' }),
  },
  {
    label: 'Reports',
    icon: 'assessment',
    action: new SelectSettingsOption({ selectedOption: 'REPORTS' }),
  },
  {
    label: 'Team',
    icon: 'domain',
    action: new SelectSettingsOption({ selectedOption: 'TEAM' }),
  },
];
