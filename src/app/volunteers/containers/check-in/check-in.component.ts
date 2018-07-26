import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatVerticalStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as LayoutActions from '../../../core/store/actions/layout.actions';
import { AppState } from '../../../core/store/reducers';
import { ServicesAgreementDialogComponent } from '../../../shared/components/services-agreement-dialog/services-agreement-dialog.component';
import { Visit, Volunteer } from '../../../shared/models';
import * as CheckInActions from '../../store/actions/check-in.actions';
import {
  CheckInContainerState,
  selectCheckInContainerState,
  selectCheckInHeaderOptions,
} from '../../store/selectors/check-in.selectors';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.scss'],
})
export class CheckInComponent implements OnInit, OnDestroy {
  private headerSubscription: Subscription;
  @ViewChild('stepper') stepper: MatVerticalStepper;
  state$: Observable<CheckInContainerState>;
  organizationId: string;
  siteId: string;

  constructor(
    private store$: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {}

  get checkInOutFormTitle() {
    return this.isCheckIn(window.location.href)
      ? 'Enter your name to check in.'
      : 'Enter your name to check out.';
  }

  get checkInOutStepperTitle() {
    return this.isCheckIn(window.location.href)
      ? 'Check in'
      : 'Check out';
  }

  ngOnInit(): void {
    this.stepper.selectedIndex = this.isCheckIn(window.location.href) ?
      0 : 2;
    this.siteId = this.activatedRoute.snapshot.paramMap.get('id');
    this.headerSubscription = this.store$.pipe(select(selectCheckInHeaderOptions))
      .subscribe((headerOptions) => {
        this.store$.dispatch(new LayoutActions.SetHeaderOptions(headerOptions));
      });
    this.state$ = this.store$.pipe(select(selectCheckInContainerState));
    this.store$.dispatch(new LayoutActions.SetSidenavOptions(null));
  }

  isCheckIn(url): boolean {
    return url.split('/').pop() === 'check-in';
  }

  ngOnDestroy(): void {
    if (this.headerSubscription) {
      this.headerSubscription.unsubscribe();
    }
  }

  onCheckIn(visit: Visit): void {
    this.store$.dispatch(new CheckInActions.CheckIn(visit));
  }

  onCheckOut(visit: Visit): void {
    this.store$.dispatch(new CheckInActions.CheckOut(visit));
  }

  onNewVolunteer(volunteer: Volunteer): void {
    this.store$.dispatch(new CheckInActions.SubmitNewVolunteer(volunteer));
  }

  onIsExistingVolunteer(isExisting: boolean): void {
    !isExisting ? this.stepper.next() : this.stepper.selectedIndex = 2;
  }

  openServicesAgreementDialog(): void {
    this.dialog.open(ServicesAgreementDialogComponent);
  }
}
