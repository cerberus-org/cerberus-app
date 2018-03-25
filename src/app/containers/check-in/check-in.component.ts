import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/distinctUntilChanged';
import { Subscription } from 'rxjs/Subscription';

import * as AppActions from '../../actions/app.actions';
import * as CheckInActions from '../../actions/check-in.actions';
import { HeaderOptions, Visit, Volunteer } from '../../models';
import { State } from '../../reducers';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit, OnDestroy {
  private appSubscription: Subscription;
  private modelSubscription: Subscription;

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  visits: Visit[];
  volunteers: Volunteer[];
  organizationId: string;
  siteId: string;

  constructor(private store: Store<State>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.siteId = this.activatedRoute.snapshot.paramMap.get('id');

    this.appSubscription = this.store.select('auth')
      .map(state => state.organization)
      .subscribe((organization) => {
        if (organization) {
          this.organizationId = organization.id;
          this.store.dispatch(new AppActions.SetHeaderOptions(new HeaderOptions(
            organization.name,
            'business',
            '/dashboard',
            true,
          )));
        }
      });

    this.modelSubscription = this.store.select('model')
      .subscribe((state) => {
        this.visits = state.visits;
        this.volunteers = state.volunteers;
      });

    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }

  ngOnDestroy(): void {
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
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
