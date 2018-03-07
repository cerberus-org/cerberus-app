import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppActions from '../../actions/app.actions';
import { HeaderOptions } from '../../models';
import { State } from '../../reducers';

@Component({
  selector: 'app-public-organization-dashboard',
  templateUrl: './public-organization-dashboard.component.html',
  styleUrls: ['./public-organization-dashboard.component.scss'],
})
export class PublicOrganizationDashboardComponent implements OnInit {

  private headerOptions: HeaderOptions = new HeaderOptions(
    'Public Dashboard',
    'domain',
    null,
    false,
  );

  constructor(public store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
  }
}
