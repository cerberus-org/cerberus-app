import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as LoginActions from './actions/login.actions';
import * as RouterActions from './actions/router.actions';
import { VerificationDialogComponent } from './containers/verification-dialog/verification-dialog.component';
import { getLocalStorageObjectProperty } from './functions/localStorageObject';
import { State } from './reducers/index';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(SidenavComponent) sidenav: SidenavComponent;
  routerEventsSubscription: Subscription;
  previousUrl: string;
  icon: string;
  text: string;

  constructor(private router: Router,
              private store: Store<State>,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.routerEventsSubscription = this.subscribeToRouterEvents();
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
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
      case 'sidenav_toggle':
        this.sidenav.toggle();
        break;
      case 'back':
        this.store.dispatch(new RouterActions.Back());
        break;
      case 'settings':
        this.openAndSubscribeToDialog();
        break;
      case 'logOut':
        this.store.dispatch(new LoginActions.LogOut({}));
        break;
    }
  }

  /**
   * Open the dialog and subscribe to the observable that is returned on close
   * to extract the password. Once password is obtained dispatch the verify effect.
   */
  public openAndSubscribeToDialog() {
    const dialog = this.dialog.open(VerificationDialogComponent);
    dialog.afterClosed()
      .subscribe(
        pwd => {
          // Once the Observable is returned dispatch an effect
          this.store.dispatch(new LoginActions.Verify(pwd));
        }
      );
  }

  /**
   * Used to determine if header "Log Out" button should be displayed.
   * @returns {boolean} - true if logged in
   */
  get isLoggedIn() {
    return !!getLocalStorageObjectProperty('user', 'id');
  }
}

