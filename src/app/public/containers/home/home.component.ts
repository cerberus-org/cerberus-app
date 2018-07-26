import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as LayoutActions from '../../../core/store/actions/layout.actions';
import * as RouterActions from '../../../core/store/actions/router.actions';
import { AppState } from '../../../core/store/reducers';
import { Organization } from '../../../shared/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  organization: Organization;
  modelSubscription: Subscription;

  constructor(public store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new LayoutActions.SetHeaderOptions(null));
  }

  onValidOrganization(organization: Organization): void {
    this.organization = organization;
  }

  onInputIconButtonClick(organization: Organization) {
    this.store$.dispatch(new RouterActions.Go({ path: ['/public-dashboard/' + organization.name] }));
  }

  onClickSignUpButton() {
    this.store$.dispatch(new RouterActions.Go({ path: ['/sign-up'] }));
  }
}
