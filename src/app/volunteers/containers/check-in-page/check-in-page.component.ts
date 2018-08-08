import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatVerticalStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as LayoutActions from '../../../core/actions/layout.actions';
import * as ModelActions from '../../../core/actions/model.actions';
import { AppState } from '../../../core/reducers';
import { ServicesAgreementDialogComponent } from '../../../shared/components/services-agreement-dialog/services-agreement-dialog.component';
import { Visit, Volunteer } from '../../../shared/models';
import * as CheckInActions from '../../actions/check-in.actions';
import {
  CheckInContainerState,
  getCheckInHeaderOptions,
  selectCheckInContainerState,
} from '../../selectors/check-in.selectors';

@Component({
  selector: 'app-check-in-page',
  templateUrl: './check-in-page.component.html',
  styleUrls: ['./check-in-page.component.scss'],
})
export class CheckInPageComponent implements OnInit, OnDestroy {
  private headerSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  @ViewChild('stepper') stepper: MatVerticalStepper;
  state$: Observable<CheckInContainerState>;
  teamId: string;
  siteId: string;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private store$: Store<AppState>) {
    store$.dispatch(new ModelActions.LoadTeams());
    this.routeParamsSubscription = route.params
      .pipe(switchMap(({ teamId }) => [
        new ModelActions.SelectTeam({ teamId }),
        new ModelActions.LoadVisits(teamId),
        new ModelActions.LoadVolunteers(teamId),
      ]))
      .subscribe(store$);
    this.headerSubscription = store$
      .pipe(
        select(getCheckInHeaderOptions),
        map(headerOptions => new LayoutActions.SetHeaderOptions(headerOptions)),
      )
      .subscribe(store$);
    store$.dispatch(new LayoutActions.SetSidenavOptions(null));
    this.state$ = store$.pipe(select(selectCheckInContainerState));
  }

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
    this.stepper.selectedIndex = this.isCheckIn(window.location.href) ? 0 : 2;
  }

  isCheckIn(url): boolean {
    return url.split('/').pop() === 'check-in';
  }

  ngOnDestroy(): void {
    this.headerSubscription.unsubscribe();
    this.routeParamsSubscription.unsubscribe();
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
