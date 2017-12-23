import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import * as LoginActions from './actions/login.actions';
import * as RouterActions from './actions/router.actions';
import { VerificationDialogComponent } from './containers/verification-dialog/verification-dialog.component';
import { getLocalStorageObjectProperty } from './functions/localStorageObject';
import { HeaderOptions } from './models/header-options';
import { State } from './reducers/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appSubscription: Subscription;
  headerOptions: HeaderOptions;

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private store: Store<State>,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.appSubscription = this.store
      .select('app')
      .subscribe(state => {
        this.headerOptions = state.headerOptions;
        /**
         * TODO:
         * ExpressionChangedAfterItHasBeenCheckedError generates if the following line is
         * not present. Find alternate solution.
         */
        this.changeDetectorRef.detectChanges();
      });
  }

  /**
   * Handles header buttonClick events.
   * @param action - the string used to determine which button was clicked
   */
  onButtonClick(action: string): void {
    switch (action) {
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
          if (pwd) {
            // Once the Observable is returned dispatch an effect
            this.store.dispatch(new LoginActions.Verify(pwd));
          }
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

