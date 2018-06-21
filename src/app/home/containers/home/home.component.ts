import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Organization } from '../../../models';
import * as AppActions from '../../../root/store/actions/app.actions';
import * as RouterActions from '../../../root/store/actions/router.actions';
import { RootState } from '../../../root/store/reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  organizationName: string;
  modelSubscription: Subscription;
  organizations: Organization[];

  constructor(public store$: Store<RootState>) {}

  ngOnInit() {
    this.modelSubscription = this.store$.select('model')
      .subscribe((state) => {
        if (state.organizations) {
          this.organizations = state.organizations;
        }
      });
    this.store$.dispatch(new AppActions.SetHeaderOptions(null));
  }

  onValidInput(organizationName: string): void {
    this.organizationName = organizationName;
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
