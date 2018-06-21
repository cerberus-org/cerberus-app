import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectSessionReducerState } from '../../../auth/store/selectors/session.selectors';
import { HeaderOptions, SidenavOptions, Site, Visit } from '../../../models';
import * as AppActions from '../../../root/store/actions/app.actions';
import * as RouterActions from '../../../root/store/actions/router.actions';
import { RootState } from '../../../root/store/reducers';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss'],
})
export class OrganizationDashboardComponent implements OnInit, OnDestroy {
  private sessionSubscription: Subscription;
  private modelSubscription: Subscription;

  sites: Site[];
  visits$: Observable<Visit[]>;

  constructor(private store$: Store<RootState>) {}

  ngOnInit(): void {
    this.sessionSubscription = this.store$
      .pipe(
        select(selectSessionReducerState),
        map(state => state.organization),
      )
      .subscribe((organization) => {
        if (organization) {
          this.store$.dispatch(new AppActions.SetHeaderOptions(new HeaderOptions(
            organization.name,
            'business',
            null,
            true,
          )));
        }
      });

    this.visits$ = this.store$.select('model').pipe(
      map(state => state.visits));

    this.modelSubscription = this.store$.select('model').pipe(
      map(state => state.sites))
      .subscribe((sites) => {
        if (sites) {
          this.store$.dispatch(new AppActions.SetSidenavOptions(
            sites.reduce(
              (options, site) => options.concat(
                [
                  new SidenavOptions(
                    'Check in',
                    'done',
                    new RouterActions.Go({ path: [`/checkin/${site.id}`] }),
                  ),
                  new SidenavOptions(
                    'Check out',
                    'done_all',
                    new RouterActions.Go({ path: [`/checkout/${site.id}`] }),
                  ),
                ],
              ),
              [],
            ),
          ));
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }
}
