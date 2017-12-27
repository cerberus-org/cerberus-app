import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as AppActions from '../../actions/app.actions';
import * as RouterActions from '../../actions/router.actions';
import { getLocalStorageObjectProperty } from '../../functions/localStorageObject';
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
  sites: Site[];

  constructor(private store: Store<State>,
              private siteService: SiteService) { }

  ngOnInit(): void {
    this.store.dispatch(new AppActions.SetHeaderOptions(
      new HeaderOptions(
        getLocalStorageObjectProperty('organization', 'name'),
        'business',
        null
      )
    ));
    this.sitesSubscription = this.siteService
      .getByKey(
        'organizationId',
        getLocalStorageObjectProperty('organization', 'id'),
        true
      )
      .subscribe(sites => this.store.dispatch(new AppActions.SetSidenavOptions(
        sites.map(site => new SidenavOptions(
          'Check In',
          new RouterActions.Go({ path: [`/checkin/${site.id}`] })
        ))
      )));
  }

  ngOnDestroy(): void {
    if (this.sitesSubscription) {
      this.sitesSubscription.unsubscribe();
    }
  }
}
