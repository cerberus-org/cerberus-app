import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import * as LayoutActions from '../../../core/actions/layout.actions';
import * as ModelActions from '../../../core/actions/model.actions';
import * as SettingsActions from '../../actions/settings.actions';
import { SettingsState } from '../../reducers';
import { selectSettingsSidenavOptions, selectSettingsSidenavSelection } from '../../selectors/settings.selectors';

@Component({
  selector: 'app-settings-page',
  template: `
    <div [ngSwitch]="(sidenavSelection$ | async)">
      <app-user-settings
        *ngSwitchCase="'USER_SETTINGS'"
      >
      </app-user-settings>
      <app-organization-settings
        *ngSwitchCase="'ORGANIZATION_SETTINGS'"
      >
      </app-organization-settings>
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
    </div>
  `,
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  private routeParamsSubscription: Subscription;
  private sidenavSubscription: Subscription;
  sidenavSelection$: Observable<string>;

  constructor(private route: ActivatedRoute, private store$: Store<SettingsState>) {
  }

  ngOnInit() {
    this.store$.dispatch(new LayoutActions.SetHeaderOptions({
      title: 'Settings',
      previousUrl: 'teams',
      showSettings: false,
    }));
    this.store$.dispatch(new SettingsActions.LoadPage('USER_SETTINGS'));
    this.routeParamsSubscription = this.route.params
      .pipe(
        switchMap(({ teamId }) => [
        new ModelActions.SelectTeam({ teamId }),
        new ModelActions.LoadMembers(teamId),
        new ModelActions.LoadSites(teamId),
        new ModelActions.LoadVisits(teamId),
        new ModelActions.LoadVolunteers(teamId),
      ]))
      .subscribe(this.store$);
    this.sidenavSubscription = this.store$
      .pipe(
        select(selectSettingsSidenavOptions),
        map(sidenavOptions => new LayoutActions.SetSidenavOptions(sidenavOptions)),
      )
      .subscribe(this.store$);
    this.sidenavSelection$ = this.store$.pipe(select(selectSettingsSidenavSelection));
  }

  ngOnDestroy() {
    if (this.sidenavSubscription) {
      this.sidenavSubscription.unsubscribe();
    }
  }
}
