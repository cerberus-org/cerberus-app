import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as AppActions from '../../actions/app.actions';
import * as RouterActions from '../../actions/router.actions';
import { Organization } from '../../models';
import { State } from '../../reducers';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  organizationName: string;
  modelSubscription: Subscription;
  organizations: Organization[];

  constructor(public store: Store<State>,
              private router: Router) {}

  ngOnInit() {
    this.modelSubscription = this.store.select('model')
      .subscribe((state) => {
        if (state.organizations) {
          this.organizations = state.organizations;
        }
      });
    this.store.dispatch(new AppActions.SetHeaderOptions(null));
  }

  onValidInput(organizationName: string): void {
    this.organizationName = organizationName;
  }

  onLiveData(organizationName: string) {
    this.store.dispatch(new RouterActions.Go({ path: ['/public-dashboard/' + organizationName] }));
  }

  onNewOrganization() {
    this.store.dispatch(new RouterActions.Go({ path: ['/start'] }));
  }

  onJoinOrganization() {
    this.store.dispatch(new RouterActions.Go({ path: ['/join'] }));
  }
}
