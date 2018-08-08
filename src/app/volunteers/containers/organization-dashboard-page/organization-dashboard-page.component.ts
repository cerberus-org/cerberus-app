import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as LayoutActions from '../../../core/actions/layout.actions';
import { SetSidenavOptions } from '../../../core/actions/layout.actions';
import * as ModelActions from '../../../core/actions/model.actions';
import * as RouterActions from '../../../core/actions/router.actions';
import { AppState } from '../../../core/reducers';
import { selectModelVisits } from '../../../core/selectors/model.selectors';
import { Visit } from '../../../shared/models';
import { getOrganizationDashboardHeaderOptions } from '../../selectors/organization-dashboard.selectors';

@Component({
  selector: 'app-organization-dashboard-page',
  template: `
    <div class="grid">
      <app-data-display [visits$]="visits$"></app-data-display>
    </div>
  `,
  styleUrls: ['./organization-dashboard-page.component.scss'],
})
export class OrganizationDashboardPageComponent implements OnDestroy {
  private routeParamsSubscription: Subscription;
  private headerSubscription: Subscription;
  visits$: Observable<Visit[]>;

  constructor(private route: ActivatedRoute, private store$: Store<AppState>) {
    store$.dispatch(new ModelActions.LoadOrganizations());
    this.routeParamsSubscription = route.params
      .pipe(switchMap(({ teamId }) => [
        new SetSidenavOptions([
          {
            label: 'Check in',
            icon: 'done',
            action: new RouterActions.Go({
              // Workaround using teamId in path; using relativeTo extra causes error
              path: ['teams', teamId, 'volunteers', 'check-in'],
            }),
          },
          {
            label: 'Check out',
            icon: 'done_all',
            action: new RouterActions.Go({
              path: ['teams', teamId, 'volunteers', 'check-out'],
            }),
          },
        ]),
        new ModelActions.SelectTeam({ teamId }),
        new ModelActions.LoadSites(teamId),
        new ModelActions.LoadVisits(teamId),
      ]))
      .subscribe(store$);
    this.headerSubscription = store$
      .pipe(
        select(getOrganizationDashboardHeaderOptions),
        map(headerOptions => new LayoutActions.SetHeaderOptions(headerOptions)),
      )
      .subscribe(store$);
    this.visits$ = store$.pipe(select(selectModelVisits));
  }

  ngOnDestroy(): void {
    this.routeParamsSubscription.unsubscribe();
    this.headerSubscription.unsubscribe();
  }
}
