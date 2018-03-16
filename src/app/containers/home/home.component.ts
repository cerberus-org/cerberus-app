import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as ModelActions from '../../actions/model.actions';
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
  findOrganizationTitle: string;

  constructor(public store: Store<State>,
              private router: Router) {
    this.findOrganizationTitle = 'test';
  }

  ngOnInit() {
    this.modelSubscription = this.store.select('model')
      .subscribe((state) => {
        if (state.organizations) {
          this.organizations = state.organizations;
        }
      });
  }

  onValidInput(organizationName: string): void {
    console.log(organizationName);
    this.organizationName = organizationName;
  }

  onLiveData(organizationName: string) {
    this.store.dispatch(new RouterActions.Go({ path: ['/public-dashboard/' + organizationName] }));
  }

  onNewOrganization() {
    this.router.navigateByUrl('/start');
  }

  onJoinOrganization() {
    this.router.navigateByUrl('/join');
  }
}
