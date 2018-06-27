import { Component, OnInit, ViewChild } from '@angular/core';
import { MatCheckboxChange, MatTabGroup } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderOptions, Organization, User } from '../../../models';
import * as LayoutActions from '../../../root/store/actions/layout.actions';
import * as GettingStartedActions from '../../store/actions/getting-started.actions';
import { SignUpState } from '../../store/reducers';
import {
  GettingStartedPageState,
  selectGettingStartedPageState,
} from '../../store/selectors/getting-started.selectors';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.scss'],
})
export class GettingStartedComponent implements OnInit {
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Getting Started',
    'wb_sunny',
    '/home',
    true,
  );
  @ViewChild('tabGroup') private tabGroup: MatTabGroup;
  userFormTitle: string = 'Create an account to access your organization.';
  organizationFormTitle: string = 'Tell us about your organization.';
  state$: Observable<GettingStartedPageState> = this.store$.pipe(select(selectGettingStartedPageState));

  constructor(private store$: Store<SignUpState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new LayoutActions.SetHeaderOptions(this.headerOptions));
    this.store$.dispatch(new LayoutActions.SetSidenavOptions(null));
  }

  onValidOrganization(organization: Organization): void {
    this.store$.dispatch(new GettingStartedActions.UpdateValidOrganization(organization));
  }

  onValidUser(user: User): void {
    this.store$.dispatch(new GettingStartedActions.UpdateValidUser(user));
  }

  onCheckTos($event: MatCheckboxChange) {
    this.store$.dispatch(new GettingStartedActions.UpdateTosChecked($event.checked));
  }

  onNext(step): void {
    this.store$.dispatch(new GettingStartedActions.NextStep(step));
    this.tabGroup.selectedIndex = step;
  }

  onSubmit(): void {
    this.store$.dispatch(new GettingStartedActions.Submit());
  }
}
