import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as AppActions from '../../actions/app.actions';
import * as CheckInActions from '../../actions/check-in.actions';
import { getLocalStorageObjectProperty } from '../../functions/localStorageObject';
import { Visit } from '../../models/visit';
import { Volunteer } from '../../models/volunteer';
import { State } from '../../reducers/index';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss']
})
export class CheckInComponent implements OnInit, OnDestroy {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  checkInSubscription: Subscription;
  organizationId: string;
  siteId: string;
  visits: Visit[];
  volunteers: Volunteer[];

  constructor(private store: Store<State>,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.organizationId = getLocalStorageObjectProperty('organization', 'id');
    this.siteId = this.activatedRoute.snapshot.paramMap.get('id');
    this.store.dispatch(
      new CheckInActions.LoadData({ siteId: this.siteId, organizationId: this.organizationId }),
      );
    this.store.dispatch(
      new AppActions.SetPageConfig({
        sidenavOptions: {},
        headerOptions: {
          previousUrl: '/dashboard',
          icon: 'business',
          title: getLocalStorageObjectProperty('organization', 'name')
        }
      })
    );
    this.checkInSubscription = this.store
      .select('checkIn')
      .subscribe(state => {
        this.tabGroup.selectedIndex = state.selectedTabIndex;
        this.visits = state.visits;
        this.volunteers = state.volunteers;
      });
  }

  ngOnDestroy(): void {
    if (this.checkInSubscription) {
      this.checkInSubscription.unsubscribe();
    }
  }

  onCheckIn(visit: Visit): void {
    this.store.dispatch(new CheckInActions.CheckIn(visit));
  }

  onCheckOut(visit: Visit): void {
    this.store.dispatch(new CheckInActions.CheckOut(visit));
  }

  onNewVolunteer(volunteer: Volunteer): void {
    this.store.dispatch(new CheckInActions.SubmitNewVolunteer(volunteer));
  }
}
