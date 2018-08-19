import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SetHeaderOptions, SetSidenavOptions } from '../../../core/actions/layout.actions';
import { Go } from '../../../core/actions/router.actions';
import { LoadSitesForTeam } from '../../../core/actions/sites.actions';
import { LoadTeams, SelectTeam } from '../../../core/actions/teams.actions';
import { LoadVisitsForTeam } from '../../../core/actions/visits.actions';
import { AppState } from '../../../core/reducers';
import { getSitesForSelectedTeam } from '../../../core/selectors/sites.selectors';
import { getSelectedTeam } from '../../../core/selectors/teams.selectors';
import { getVisitsForSelectedTeam } from '../../../core/selectors/visits.selectors';
import { Site, Visit } from '../../../shared/models';

@Component({
  selector: 'app-team-dashboard-page',
  template: `
    <div class="grid">
      <app-data-display [visits$]="visits$" [sites$]="sites$"></app-data-display>
    </div>
  `,
  styleUrls: ['./team-dashboard-page.component.scss'],
})
export class TeamDashboardPageComponent implements OnDestroy {
  private routeParamsSubscription: Subscription;
  private headerSubscription: Subscription;
  visits$: Observable<Visit[]>;
  sites$: Observable<Site[]>;

  constructor(private route: ActivatedRoute, private store$: Store<AppState>) {
    store$.dispatch(new LoadTeams());
    this.routeParamsSubscription = route.params
      .pipe(switchMap(({ teamId, siteId }) => [
        new SetSidenavOptions({
          sidenavOptions: [
            {
              label: 'Check in',
              icon: 'done',
              action: new Go({
                // Workaround using teamId in path; using relativeTo extra causes error
                path: this.getPath(teamId, siteId, 'check-in'),
              }),
            },
            {
              label: 'Check out',
              icon: 'done_all',
              action: new Go({
                path: this.getPath(teamId, siteId, 'check-out'),
              }),
            },
          ],
        }),
        new SelectTeam({ teamId }),
        new LoadSitesForTeam({ teamId }),
        new LoadVisitsForTeam({ teamId }),
      ]))
      .subscribe(store$);
    this.headerSubscription = store$
      .pipe(
        select(getSelectedTeam),
        map(team => new SetHeaderOptions({
          headerOptions: {
            title: !!team ? team.name : 'Team missing!',
            previousUrl: null,
            showLogOut: false,
          },
        })),
      )
      .subscribe(store$);
    this.visits$ = store$.pipe(select(getVisitsForSelectedTeam));
    this.sites$ = store$.pipe(select(getSitesForSelectedTeam));
  }

  getPath(teamId: string, siteId: string, checkInOrOut: string): string[] {
    return siteId ? ['teams', teamId, 'sites', siteId, 'volunteers', checkInOrOut] : ['teams', teamId, 'volunteers', checkInOrOut];
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.headerSubscription.unsubscribe();
  }
}
