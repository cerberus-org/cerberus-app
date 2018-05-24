import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as LoginActions from './actions/login.actions';
import * as ModelActions from './actions/model.actions';
import * as RouterActions from './actions/router.actions';
import { PasswordDialogComponent, SidenavComponent } from './components';
import { isAdmin } from './functions';
import { HeaderOptions, SidenavOptions } from './models';
import { State } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild(SidenavComponent) sidenav: SidenavComponent;

  appSubscription: Subscription;
  authSubscription: Subscription;

  headerOptions: HeaderOptions;
  sidenavOptions: SidenavOptions[];
  user: any;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<State>,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new ModelActions.LoadOrganizations());
    this.appSubscription = this.store.select('app')
      .subscribe((state) => {
        this.headerOptions = state.headerOptions;
        this.sidenavOptions = state.sidenavOptions;
        /**
         * TODO:
         * ExpressionChangedAfterItHasBeenCheckedError is thrown if the following line is
         * not present. Find alternate solution.
         */
        this.changeDetectorRef.detectChanges();
      });

    this.authSubscription = this.store.select('auth')
      .subscribe((state) => {
        this.user = state.user;
        if (state.organization) {
          const organizationId = state.organization.id;
          this.store.dispatch(new ModelActions.LoadSites(organizationId));
          this.store.dispatch(new ModelActions.LoadVisits(organizationId));
          this.store.dispatch(new ModelActions.LoadVolunteers(organizationId));
          if (isAdmin(this.user)) {
            this.store.dispatch(new ModelActions.LoadUsers(organizationId));
          }
        }
      });
  }

  ngOnDestroy() {
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSelectIndex(index: number) {
    this.store.dispatch(this.sidenavOptions[index].action);
  }

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
        this.store.dispatch(new LoginActions.LogOut());
        break;
    }
  }

  /**
   * Open the dialog and subscribe to the observable that is returned on close
   * to extract the password. Once password is obtained dispatch the verify effect.
   */
  public openAndSubscribeToDialog() {
    const dialog = this.dialog.open(PasswordDialogComponent);
    dialog.afterClosed().subscribe((pwd) => {
      if (pwd) {
        // Once the Observable is returned dispatch an effect
        this.store.dispatch(new LoginActions.VerifyPassword({
          email: this.user.email,
          password: pwd,
        }));
      }
    });
  }

  /**
   * Used to determine if header "Log out" button should be displayed.
   * @returns {boolean} - true if logged in
   */
  get isLoggedIn() {
    return !!this.user;
  }
}
