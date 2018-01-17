import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as _ from 'lodash';
import * as AppActions from '../../actions/app.actions';
import * as RouterActions from '../../actions/router.actions';
import { HeaderOptions } from '../../models/header-options';
import { SidenavOptions } from '../../models/sidenav-options';
import { Site } from '../../models/site';
import { State } from '../../reducers/index';
import { SiteService } from '../../services/site.service';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit, OnDestroy {
  sitesSubscription: Subscription;
  appSubscription: Subscription;
  sites: Site[];

  constructor(private store: Store<State>,
              private siteService: SiteService) { }

  ngOnInit(): void {
    this.appSubscription = this.store
      .select('app')
      .map(state => state.organization)
      // Only emit if there is a change in organization
      .distinctUntilChanged((a, b) => _.isEqual(a, b))
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
          this.sitesSubscription = this.siteService
            .getByKey(
              'organizationId',
              organization.id,
              true
            )
            .subscribe(sites => this.store.dispatch(new AppActions.SetSidenavOptions(
              sites.map(site => new SidenavOptions(
                'Check In',
                'check_circle',
                new RouterActions.Go({ path: [`/checkin/${site.id}`] })
              ))
            )));
        }
      });
  }

  ngOnDestroy(): void {
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
    }
    if (this.sitesSubscription) {
      this.sitesSubscription.unsubscribe();
    }
  }
}
