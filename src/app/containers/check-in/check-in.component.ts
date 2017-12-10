import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as CheckInActions from '../../actions/check-in.actions';
import { State } from '../../reducers/index';
import { Visit } from '../../models/visit';
import { Volunteer } from '../../models/volunteer';
import { getLocalStorageObjectProperty } from '../../functions/localStorageObject';

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
      new CheckInActions.LoadData({ siteId: this.siteId, organizationId: this.organizationId })
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
    this.checkInSubscription.unsubscribe();
  }

  onCheckIn(visit: Visit): void {
    this.store.dispatch(new CheckInActions.CheckIn(visit));
  }

  onCheckOut(visit: Visit): void {
    this.store.dispatch(new CheckInActions.CheckIn(visit));
  }

  onSubmitNewVolunteer(volunteer: Volunteer): void {
    this.store.dispatch(new CheckInActions.SubmitNewVolunteer(volunteer));
  }
}
