import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as LoginActions from '../../../../actions/login.actions'
import { AppState } from '../../../../reducers/index';
import { getLocalStorageObjectProperty } from '../../../../functions/localStorageObject';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  routerEventsSubscription: Subscription;
  icon: string;
  text: string;
  previousUrl: string;

  constructor(private router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.routerEventsSubscription = this.subscribeToRouterEvents();
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }

  onBack(): void {
    this.router.navigateByUrl(this.previousUrl);
  }

  onLogout(): void {
    this.store.dispatch(new LoginActions.Logout({}))
  }

  subscribeToRouterEvents(): Subscription {
    return this.router.events.subscribe(() => {
      // Get the string after the first '/'
      switch (this.router.url.split('/')[1]) {
        case 'start':
          this.previousUrl = '/login';
          this.icon = 'wb_sunny';
          this.text = 'Getting Started';
          break;
        case 'dashboard':
          // Text set in subscribeToOrganizations()
          this.icon = 'business';
          this.text = getLocalStorageObjectProperty('organization', 'name');
          break;
        case 'checkin':
          // Text set in subscribeToOrganizations()
          this.previousUrl = '/dashboard';
          this.icon = 'business';
          this.text = getLocalStorageObjectProperty('organization', 'name');
          break;
        default:
          this.icon = 'group_work';
          this.text = 'Cerberus';
      }
    });
  };

  get showBack() {
    return (this.router.url !== '/login') && (this.router.url !== '/dashboard');
  }

  get showLogout() {
    return !!getLocalStorageObjectProperty('user', 'id');
  }
}
