import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { selectSessionReducerState } from '../../../auth/store/selectors/session.selectors';
import { isAdmin } from '../../../functions';
import { HeaderOptions, Organization, SidenavOptions, User } from '../../../models';
import { PasswordDialogComponent } from '../../../shared/components/password-dialog/password-dialog.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
import * as ModelActions from '../../store/actions/model.actions';
import * as RouterActions from '../../store/actions/router.actions';
import { RootState } from '../../store/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit, OnDestroy {
  @ViewChild(SidenavComponent) sidenav: SidenavComponent;
  state: {
    headerOptions: HeaderOptions;
    sidenavOptions: SidenavOptions[];
    organization: Organization
    user: User;
    isLoading: Boolean;
  };
  layoutSubscription: Subscription;
  sessionSubscription: Subscription;
  modelSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private changeDetectorRef: ChangeDetectorRef,
    private store$: Store<RootState>,
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

  ngOnInit(): void {
    // Enable loader on login
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.state = { ...this.state, isLoading: !!user };
    });
    this.layoutSubscription = this.store$.select('layout').subscribe(this.onNextLayoutState);
    this.sessionSubscription = this.store$.pipe(select(selectSessionReducerState))
      .subscribe(this.onNextSessionState);
    this.modelSubscription = this.store$.select('model').subscribe(this.onNextModelState);
    this.store$.dispatch(new ModelActions.LoadOrganizations());
  }

  /**
   * Handles the next layout state.
   * @param layoutState - the next state
   */
  onNextLayoutState = (layoutState) => {
    this.state = { ...this.state, ...layoutState };
    /**
     * TODO:
     * ExpressionChangedAfterItHasBeenCheckedError is thrown if the following line is
     * not present. Find alternate solution.
     */
    this.changeDetectorRef.detectChanges();
  }

  /**
   * Handles the next session store state.
   * @param sessionState - the next state
   */
  onNextSessionState = (sessionState) => {
    this.state = {
      ...this.state,
      ...sessionState,
      isLoading: !!sessionState.user,
    };
    if (sessionState.organization) {
      const organizationId = sessionState.organization.id;
      this.store$.dispatch(new ModelActions.LoadSites(organizationId));
      this.store$.dispatch(new ModelActions.LoadVisits(organizationId));
      this.store$.dispatch(new ModelActions.LoadVolunteers(organizationId));
      if (isAdmin(sessionState.user)) {
        this.store$.dispatch(new ModelActions.LoadUsers(organizationId));
      }
    }
  }

  /**
   * Handles the next model store$ state.
   * @param modelState - the next state
   */
  onNextModelState = (modelState) => {
    // Check if there is an active session before setting model
    if (this.state.user && this.state.organization) {
      setTimeout(
        () => {
          this.state = {
            ...this.state,
            // Disable loader when model is loaded
            isLoading: (
              !modelState.sites.length
              && !modelState.visits.length
              && !modelState.volunteers.length
            ),
          };
        },
        500,
      );
    }
  }

  ngOnDestroy() {
    if (this.layoutSubscription) {
      this.layoutSubscription.unsubscribe();
    }
    if (this.sessionSubscription) {
      this.sessionSubscription.unsubscribe();
    }
  }

  onSelectIndex(index: number) {
    this.store$.dispatch(this.state.sidenavOptions[index].action);
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
        this.store$.dispatch(new RouterActions.Back());
        break;
      case 'settings':
        this.openAndSubscribeToDialog();
        break;
      case 'logOut':
        this.store$.dispatch(new AuthActions.LogOut());
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
        this.store$.dispatch(new AuthActions.VerifyPassword({
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