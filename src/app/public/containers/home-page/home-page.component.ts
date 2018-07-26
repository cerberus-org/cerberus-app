import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LayoutActions from '../../../core/store/actions/layout.actions';
import * as RouterActions from '../../../core/store/actions/router.actions';
import { AppState } from '../../../core/store/reducers';
import { Organization } from '../../../shared/models';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  organization: Organization;

  constructor(public store$: Store<AppState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new LayoutActions.SetHeaderOptions(null));
  }

  onValidOrganization(organization: Organization): void {
    this.organization = organization;
  }

  onInputIconButtonClick(organization: Organization) {
    this.store$.dispatch(new RouterActions.Go({ path: ['/view-activity/' + organization.name] }));
  }

  onClickSignUpButton() {
    this.store$.dispatch(new RouterActions.Go({ path: ['/sign-up'] }));
  }
}
