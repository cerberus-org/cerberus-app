import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatVerticalStepper } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SetHeaderOptions, SetSidenavOptions } from '../../../core/actions/layout.actions';
import { LoadTeams, SelectTeam } from '../../../core/actions/teams.actions';
import { LoadVisitsForTeam } from '../../../core/actions/visits.actions';
import { LoadVolunteersForTeam } from '../../../core/actions/volunteers.actions';
import { AppState } from '../../../core/reducers';
import { getSelectedTeam } from '../../../core/selectors/teams.selectors';
import { getVisitsForSelectedTeam } from '../../../core/selectors/visits.selectors';
import { getVolunteersForSelectedTeam } from '../../../core/selectors/volunteers.selectors';
import { ServicesAgreementDialogComponent } from '../../../shared/components/services-agreement-dialog/services-agreement-dialog.component';
import { Visit, Volunteer } from '../../../shared/models';
import { CheckIn, CheckOut, SubmitNewVolunteer } from '../../actions/check-in.actions';

@Component({
  selector: 'app-check-in-page',
  templateUrl: './check-in-page.component.html',
  styleUrls: ['./check-in-page.component.scss'],
})
export class CheckInPageComponent implements OnInit, OnDestroy {
  private headerSubscription: Subscription;
  private routeParamsSubscription: Subscription;

  @ViewChild('stepper') stepper: MatVerticalStepper;
  visits$: Observable<Visit[]>;
  volunteers$: Observable<Volunteer[]>;
  teamId: string;
  siteId: string;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private store$: Store<AppState>) {
    store$.dispatch(new LoadTeams());
    this.routeParamsSubscription = route.params.pipe(
      switchMap(({ teamId }) => [
        new SelectTeam({ teamId }),
        new LoadVisitsForTeam({ teamId }),
        new LoadVolunteersForTeam({ teamId }),
      ]),
    )
      .subscribe(store$);
    this.headerSubscription = store$.pipe(
      select(getSelectedTeam),
      map(team => new SetHeaderOptions({
        headerOptions: {
          title: !!team ? team.name : 'Loading...',
          previousUrl: 'dashboard',
          showLogOut: false,
        },
      })),
    )
      .subscribe(store$);
    store$.dispatch(new SetSidenavOptions(null));
    this.visits$ = store$.pipe(select(getVisitsForSelectedTeam));
    this.volunteers$ = store$.pipe(
      select(getVolunteersForSelectedTeam),
      map((vols) => {
        console.log(vols);
        return vols;
      }),
    );
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
    this.store$.dispatch(new CheckIn(visit));
  }

  onCheckOut(visit: Visit): void {
    this.store$.dispatch(new CheckOut(visit));
  }

  onNewVolunteer(volunteer: Volunteer): void {
    this.store$.dispatch(new SubmitNewVolunteer(volunteer));
  }

  onIsExistingVolunteer(isExisting: boolean): void {
    !isExisting ? this.stepper.next() : this.stepper.selectedIndex = 2;
  }

  openServicesAgreementDialog(): void {
    this.dialog.open(ServicesAgreementDialogComponent);
  }
}
