import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Organization } from '../../../core/models';
import * as LayoutActions from '../../../root/store/actions/layout.actions';
import * as RouterActions from '../../../root/store/actions/router.actions';
import { RootState } from '../../../root/store/reducers';

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
