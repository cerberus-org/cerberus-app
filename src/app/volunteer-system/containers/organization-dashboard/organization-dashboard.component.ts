import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Visit } from '../../../core/models';
import * as LayoutActions from '../../../root/store/actions/layout.actions';
import { RootState } from '../../../root/store/reducers';
import { selectModelVisits } from '../../../root/store/selectors/model.selectors';
import {
  selectOrganizationDashboardHeaderOptions,
  selectOrganizationDashboardSidenavOptions,
} from '../../store/selectors/organization-dashboard.selectors';

@Component({
  selector: 'app-organization-dashboard',
  templateUrl: './organization-dashboard.component.html',
  styleUrls: ['./organization-dashboard.component.scss'],
})
export class OrganizationDashboardComponent implements OnInit, OnDestroy {
  private headerSubscription: Subscription;
  private sidenavSubscription: Subscription;
  visits$: Observable<Visit[]>;

  constructor(private store$: Store<RootState>) {}

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
