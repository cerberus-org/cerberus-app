import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as LayoutActions from '../../../core/store/actions/layout.actions';
import { AppState } from '../../../core/store/reducers';
import { selectModelVisits } from '../../../core/store/selectors/model.selectors';
import { Visit } from '../../../shared/models';
import {
  selectOrganizationDashboardHeaderOptions,
  selectOrganizationDashboardSidenavOptions,
} from '../../store/selectors/organization-dashboard.selectors';

@Component({
  selector: 'app-organization-dashboard-page',
  templateUrl: './organization-dashboard-page.component.html',
  styleUrls: ['./organization-dashboard-page.component.scss'],
})
export class OrganizationDashboardPageComponent implements OnInit, OnDestroy {
  private headerSubscription: Subscription;
  private sidenavSubscription: Subscription;
  visits$: Observable<Visit[]>;

  constructor(private store$: Store<AppState>) {}

  ngOnInit(): void {
    this.visits$ = this.store$.pipe(select(selectModelVisits));
    this.headerSubscription = this.store$.pipe(select(selectOrganizationDashboardHeaderOptions))
      .subscribe((headerOptions) => {
        this.store$.dispatch(new LayoutActions.SetHeaderOptions(headerOptions));
      });
    this.sidenavSubscription = this.store$.pipe(select(selectOrganizationDashboardSidenavOptions))
      .subscribe((sidenavOptions) => {
        this.store$.dispatch(new LayoutActions.SetSidenavOptions(sidenavOptions));
      });
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
