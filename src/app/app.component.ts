import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { State } from './reducers/index';
import { getLocalStorageObjectProperty } from './functions/localStorageObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  routerEventsSubscription: Subscription;
  previousUrl: string;
  icon: string;
  text: string;

  constructor(private router: Router,
              private store: Store<State>) { }

  ngOnInit() {
    this.routerEventsSubscription = this.subscribeToRouterEvents();
  }

  ngOnDestroy() {
    this.routerEventsSubscription.unsubscribe();
  }

  /**
   * Watches for router events to update previousUrl and header display.
   * @returns {Subscription} - the subscription to router.events
   */
  subscribeToRouterEvents(): Subscription {
    return this.router.events.subscribe(() => {
      // Trim leading '/' and routeParams
      switch (this.router.url.split('/')[1]) {
        case 'start':
          this.previousUrl = '/login';
          this.icon = 'wb_sunny';
          this.text = 'Getting Started';
          break;
        case 'dashboard':
          // Text set in subscribeToOrganizations()
          this.previousUrl = null;
          this.icon = 'business';
          this.text = getLocalStorageObjectProperty('organization', 'name');
          break;
        case 'checkin':
          // Text set in subscribeToOrganizations()
          this.previousUrl = '/dashboard';
          this.icon = 'business';
          this.text = getLocalStorageObjectProperty('organization', 'name');
          break;
        default: {
          this.previousUrl = null;
          this.icon = 'group_work';
          this.text = 'Cerberus';
        }
      }
    });
  };

  /**
   * Handles header buttonClick events.
   * @param action - the string used to determine which button was clicked
   */
  onButtonClick(action: string): void {
    switch (action) {
      case 'back':
        this.router.navigateByUrl(this.previousUrl);
        break;
      case 'settings':
        break;
      case 'logOut':
        this.store.dispatch(new LoginActions.LogOut({}));
        break;
    }
  }

  /**
   * Used to determine if header "Log Out" button should be displayed.
   * @returns {boolean} - true if logged in
   */
  get isLoggedIn() {
    return !!getLocalStorageObjectProperty('user', 'id');
  }
}

