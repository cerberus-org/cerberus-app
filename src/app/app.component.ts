import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';
import * as LoginActions from './actions/login.actions';
import * as ModelActions from './actions/model.actions';
import * as RouterActions from './actions/router.actions';
import { PasswordDialogComponent, SidenavComponent } from './components';
import { isAdmin } from './functions';
import { HeaderOptions, Organization, SidenavOptions, User } from './models';
import { State } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild(SidenavComponent) sidenav: SidenavComponent;
  state: {
    headerOptions: HeaderOptions;
    sidenavOptions: SidenavOptions[];
    organization: Organization
    user: User;
    isLoading: Boolean;
  };
  appSubscription: Subscription;
  authSubscription: Subscription;
  modelSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private changeDetectorRef: ChangeDetectorRef,
    private store: Store<State>,
    private dialog: MatDialog,
  ) {
    this.state = {
      headerOptions: null,
      sidenavOptions: [],
      organization: null,
      user: null,
      isLoading: true,
    };
  }

  ngOnInit() {
    // Enable loader on login
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.state = Object.assign(this.state, { isLoading: !!user });
    });
    this.appSubscription = this.store.select('app').subscribe(this.onNextAppState);
    this.authSubscription = this.store.select('auth').subscribe(this.onNextAuthState);
    this.modelSubscription = this.store.select('model').subscribe(this.onNextModelState);
    this.store.dispatch(new ModelActions.LoadOrganizations());
  }

  /**
   * Handles the next app store state.
   * @param appState - the next state
   */
  onNextAppState = (appState) => {
    this.state = Object.assign(this.state, { ...appState });
    /**
     * TODO:
     * ExpressionChangedAfterItHasBeenCheckedError is thrown if the following line is
     * not present. Find alternate solution.
     */
    this.changeDetectorRef.detectChanges();
  };

  /**
   * Handles the next auth store state.
   * @param authState - the next state
   */
  onNextAuthState = (authState) => {
    Object.assign(this.state, { ...authState, isLoading: !!authState.user });
    if (authState.organization) {
      const organizationId = authState.organization.id;
      this.store.dispatch(new ModelActions.LoadSites(organizationId));
      this.store.dispatch(new ModelActions.LoadVisits(organizationId));
      this.store.dispatch(new ModelActions.LoadVolunteers(organizationId));
      if (isAdmin(authState.user)) {
        this.store.dispatch(new ModelActions.LoadUsers(organizationId));
      }
    }
  };

  /**
   * Handles the next model store state.
   * @param modelState - the next state
   */
  onNextModelState = (modelState) => {
    // Check if there is an active session before setting model
    if (this.state.user && this.state.organization) {
      setTimeout(
        () => {
          this.state = Object.assign(this.state, {
            // Disable loader when model is loaded
            isLoading: (
              !modelState.sites.length
              || !modelState.visits.length
              || !modelState.volunteers.length
            ),
          });
        },
        500,
      );
    }
  };

  ngOnDestroy() {
    if (this.appSubscription) {
      this.appSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onSelectIndex(index: number) {
    this.store.dispatch(this.state.sidenavOptions[index].action);
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
          email: this.state.user.email,
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
    return !!this.state.user;
  }
}
