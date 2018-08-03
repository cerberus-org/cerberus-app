import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as LayoutActions from '../../../core/actions/layout.actions';
import * as ModelActions from '../../../core/actions/model.actions';
import { AppState } from '../../../core/reducers';
import { selectModelVisits } from '../../../core/selectors/model.selectors';
import { Visit } from '../../../shared/models';
import { selectOrganizationDashboardSidenavOptions } from '../../selectors/organization-dashboard.selectors';

@Component({
  selector: 'app-organization-dashboard-page',
  templateUrl: './organization-dashboard-page.component.html',
  styleUrls: ['./organization-dashboard-page.component.scss'],
})
export class OrganizationDashboardPageComponent implements OnInit, OnDestroy {
  private headerSubscription: Subscription;
  private sidenavSubscription: Subscription;
  visits$: Observable<Visit[]>;

  constructor(private store$: Store<AppState>) {
    this.visits$ = this.store$.pipe(select(selectModelVisits));
  }

  ngOnInit(): void {
    this.store$.dispatch(new LayoutActions.SetHeaderOptions({
      title: sessionStorage.getItem('teamName'),
      icon: 'business',
      previousUrl: null,
      showSettings: false,
    }));
    this.sidenavSubscription = this.store$.pipe(select(selectOrganizationDashboardSidenavOptions))
      .subscribe((sidenavOptions) => {
        this.store$.dispatch(new LayoutActions.SetSidenavOptions(sidenavOptions));
      });

    // Load data based on team ID in session storage
    const teamId = sessionStorage.getItem('teamId');
    this.store$.dispatch(new ModelActions.LoadSites(teamId));
    this.store$.dispatch(new ModelActions.LoadVisits(teamId));
    this.store$.dispatch(new ModelActions.LoadVolunteers(teamId));
  }

  ngOnDestroy(): void {
    if (this.headerSubscription) {
      this.headerSubscription.unsubscribe();
    }
    if (this.sidenavSubscription) {
      this.sidenavSubscription.unsubscribe();
    }
  }
}
