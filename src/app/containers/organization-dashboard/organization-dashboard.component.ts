import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as RouterActions from '../../actions/router.actions';
import { State } from '../../reducers/index';
import { Site } from '../../models/site';
import { SiteService } from '../../services/site.service';
import { getLocalStorageObjectProperty } from '../../functions/localStorageObject';


@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss']
})
export class OrganizationDashboardComponent implements OnInit {
  sites$: Observable<Site[]>;

  constructor(private store: Store<State>,
              private siteService: SiteService) { }

  ngOnInit(): void {
    this.sites$ = this.siteService.getByKey(
      'organizationId',
      getLocalStorageObjectProperty('organization', 'id'),
      true);
  }

  onSiteClick(site: Site): void {
    this.store.dispatch(
      new RouterActions.Go({ path: [`/checkin/${site.id}`] })
    );
  }
}
