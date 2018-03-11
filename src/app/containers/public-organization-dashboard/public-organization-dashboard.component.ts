import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as AppActions from '../../actions/app.actions';
import { HeaderOptions } from '../../models';
import { State } from '../../reducers';

@Component({
  selector: 'app-public-organization-dashboard',
  templateUrl: './public-organization-dashboard.component.html',
  styleUrls: ['./public-organization-dashboard.component.scss'],
})
export class PublicOrganizationDashboardComponent implements OnInit {

  private modelSubscription: Subscription;

  constructor(public store: Store<State>) { }

  ngOnInit() {
    const headerOptions: HeaderOptions = new HeaderOptions(
      this.getOrganizationNameByUrl(),
      'domain',
      '/dashboard',
      false,
    );

    this.store.dispatch(new AppActions.SetHeaderOptions(headerOptions));
  }

  public getOrganizationNameByUrl(): string {
    const url = window.location.href;
    return url.substr(url.lastIndexOf('/') + 1);
  }

  ngOnDestroy(): void {
    if (this.modelSubscription) {
      this.modelSubscription.unsubscribe();
    }
  }
}
