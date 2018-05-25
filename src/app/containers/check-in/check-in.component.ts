import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatVerticalStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as AppActions from '../../actions/app.actions';
import * as CheckInActions from '../../actions/check-in.actions';
import { ServicesAgreementDialogComponent } from '../../components/services-agreement-dialog/services-agreement-dialog.component';
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

  @ViewChild('stepper') stepper: MatVerticalStepper;

  visits: Visit[];
  volunteers: Volunteer[];
  organizationId: string;
  siteId: string;
  checkInOutFormTitle: string;
  checkInOutStepperTitle: string;

  constructor(private store: Store<State>,
              private activatedRoute: ActivatedRoute,
              public dialog: MatDialog) {
    this.checkInOutFormTitle = 'Test';
  }

  ngOnInit(): void {
    this.checkInOutFormTitle = this.isCheckIn(window.location.href) ?
      'Enter your name to check in.' : 'Enter your name to check out.';
    this.checkInOutStepperTitle = this.isCheckIn(window.location.href) ?
      'Check in' : 'Check out';
    this.stepper.selectedIndex = this.isCheckIn(window.location.href) ?
      0 : 2;

    this.siteId = this.activatedRoute.snapshot.paramMap.get('id');
    this.appSubscription = this.store.select('auth')
      .pipe(map(state => state.organization))
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

  isCheckIn(url): boolean {
    return url.split('/')[3] === 'checkin';
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

  onIsExistingVolunteer(isExisitingVolunteer: boolean): void {
    !isExisitingVolunteer ? this.stepper.next() : this.stepper.selectedIndex = 2;
  }

  openServicesAgreementDialog(): void {
    this.dialog.open(ServicesAgreementDialogComponent);
  }
}
