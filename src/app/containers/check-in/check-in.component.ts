import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';

import * as AppActions from '../../actions/app.actions';
import * as CheckInActions from '../../actions/check-in.actions';
import { HeaderOptions } from '../../models/header-options';
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
  appSubscription: Subscription;
  checkInSubscription: Subscription;
  modelSubscription: Subscription;
  organizationId: string;
  siteId: string;
  visits: Visit[];
  volunteers: Volunteer[];

  constructor(private store: Store<State>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.store.dispatch(new AppActions.SetSidenavOptions(null));

    this.appSubscription = this.store.select('auth')
      .map(state => state.organization)
      .subscribe(organization => {
        if (organization) {
          this.organizationId = organization.id;
          this.siteId = this.activatedRoute.snapshot.paramMap.get('id');
          this.store.dispatch(
            new AppActions.SetHeaderOptions(
              new HeaderOptions(
                organization.name,
                'business',
                '/dashboard',
                true,
              ))
          )
        }
      });

    this.checkInSubscription = this.store.select('checkIn')
      .subscribe(state => {
        this.tabGroup.selectedIndex = state.selectedTabIndex;
      });

    this.modelSubscription = this.store.select('model')
      .subscribe(state => {
        this.visits = state.visits;
        this.volunteers = state.volunteers;
      });
  }

  ngOnDestroy(): void {
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
    }
    if (this.checkInSubscription) {
      this.checkInSubscription.unsubscribe();
    }
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
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
