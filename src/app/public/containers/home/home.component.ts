import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as LayoutActions from '../../../core/store/actions/layout.actions';
import * as RouterActions from '../../../core/store/actions/router.actions';
import { RootState } from '../../../core/store/reducers/index';
import { Organization } from '../../../shared/models/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  organization: Organization;
  modelSubscription: Subscription;

  constructor(public store$: Store<RootState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new LayoutActions.SetHeaderOptions(null));
  }

  onValidOrganization(organization: Organization): void {
    this.organization = organization;
  }

  onInputIconButtonClick(organization: Organization) {
    this.store$.dispatch(new RouterActions.Go({ path: ['/public-dashboard/' + organization.name] }));
  }

  onNewOrganization() {
    this.store$.dispatch(new RouterActions.Go({ path: ['/start'] }));
  }

  onJoinOrganization() {
    this.store$.dispatch(new RouterActions.Go({ path: ['/join'] }));
  }
}
