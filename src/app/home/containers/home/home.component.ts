import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as AppActions from '../../../root/store/actions/app.actions';
import * as RouterActions from '../../../root/store/actions/router.actions';
import { RootState } from '../../../root/store/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  findOrganizationValue: string;
  modelSubscription: Subscription;

  constructor(public store$: Store<RootState>) {}

  ngOnInit(): void {
    this.store$.dispatch(new AppActions.SetHeaderOptions(null));
  }

  onValidInput(organizationName: string): void {
    this.findOrganizationValue = organizationName;
  }

  onInputIconButtonClick(organizationName: string) {
    this.store$.dispatch(new RouterActions.Go({ path: ['/public-dashboard/' + organizationName] }));
  }

  onNewOrganization() {
    this.store$.dispatch(new RouterActions.Go({ path: ['/start'] }));
  }

  onJoinOrganization() {
    this.store$.dispatch(new RouterActions.Go({ path: ['/join'] }));
  }
}
