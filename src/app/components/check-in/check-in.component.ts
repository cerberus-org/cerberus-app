import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as CheckInActions from '../../actions/check-in.actions'
import { AppState } from '../../reducers/index';
import { getLocalStorageObjectProperty } from '../../functions/localStorageObject';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.css']
})
export class CheckInComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  checkInSubscription: Subscription;

  constructor(private store: Store<AppState>,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const siteId = this.activatedRoute.snapshot.paramMap.get('id');
    const organizationId = getLocalStorageObjectProperty('organization', 'id');
    this.store.dispatch(new CheckInActions.LoadData({ siteId, organizationId }));

    this.checkInSubscription = this.store
      .select('checkIn')
      .subscribe(state => this.tabGroup.selectedIndex = state.selectedTabIndex);
  }

  ngOnDestroy(): void {
    this.checkInSubscription.unsubscribe();
  }
}
