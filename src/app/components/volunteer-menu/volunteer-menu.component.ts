import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as RouterActions from '../../actions/router.actions';
import { State } from '../../reducers/index';
import { Site } from '../../models/site';
import { SiteService } from '../../services/site.service';
import { getLocalStorageObjectProperty } from '../../functions/localStorageObject';

@Component({
  selector: 'app-volunteer-menu',
  templateUrl: './volunteer-menu.component.html',
  styleUrls: ['./volunteer-menu.component.scss']
})
export class VolunteerMenuComponent implements OnInit {

  sites$: Observable<Site[]>;
  error: string;

  constructor(private store: Store<State>,
              private siteService: SiteService) { }

  ngOnInit(): void {
    this.sites$ = this.siteService.getByKey(
      'organizationId',
      getLocalStorageObjectProperty('organization', 'id'),
      true);
  }

  onClick(site): void {
    this.store.dispatch(
      new RouterActions.Go({ path: ['/checkin', { routeParam: site.id }] })
    );
  }
}
