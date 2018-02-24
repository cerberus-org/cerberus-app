import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as AppActions from '../../actions/app.actions';
import * as RouterActions from '../../actions/router.actions';
import { HeaderOptions } from '../../models/header-options';
import { SidenavOptions } from '../../models/sidenav-options';
import { Site } from '../../models/site';
import { State } from '../../reducers/index';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit, OnDestroy {
  private appSubscription: Subscription;
  private modelSubscription: Subscription;

  sites: Site[];

  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.appSubscription = this.store.select('auth')
      .map(state => state.organization)
      .subscribe(organization => {
        if (organization) {
          this.store.dispatch(new AppActions.SetHeaderOptions(
            new HeaderOptions(
              organization.name,
              'business',
              null,
              true,
            )
          ));
        }
      });

    this.modelSubscription = this.store.select('model')
      .map(state => state.sites)
      .subscribe(sites => {
        if (sites) {
          this.store.dispatch(
            new AppActions.SetSidenavOptions(
              sites.map(site => new SidenavOptions(
                'Record Visit',
                'check_circle',
                new RouterActions.Go({ path: [`/checkin/${site.id}`] })
              ))
            )
          )
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
