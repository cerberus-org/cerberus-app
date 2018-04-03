import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';
import * as AppActions from '../../actions/app.actions';
import * as RouterActions from '../../actions/router.actions';
import { HeaderOptions, SidenavOptions, Site, Visit } from '../../models';
import { State } from '../../reducers';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss'],
})
export class OrganizationDashboardComponent implements OnInit, OnDestroy {
  private appSubscription: Subscription;
  private modelSubscription: Subscription;

  sites: Site[];
  visits$: Observable<Visit[]>;

  constructor(private store: Store<State>) {
  }

  ngOnInit(): void {
    this.appSubscription = this.store.select('auth')
      .map(state => state.organization)
      .subscribe((organization) => {
        if (organization) {
          this.store.dispatch(new AppActions.SetHeaderOptions(new HeaderOptions(
            organization.name,
            'business',
            null,
            true,
          )));
        }
      });

    this.visits$ = this.store.select('model')
      .map(state => state.visits);

    this.modelSubscription = this.store.select('model')
      .map(state => state.sites)
      .subscribe((sites) => {
        if (sites) {
          this.store.dispatch(new AppActions.SetSidenavOptions(
            sites.reduce(
              (options, site) => options.concat(
                [
                  new SidenavOptions(
                    'Check In',
                    'done',
                    new RouterActions.Go({ path: [`/checkin/${site.id}`] }),
                  ),
                  new SidenavOptions(
                    'Check Out',
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
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
    }
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }
}
