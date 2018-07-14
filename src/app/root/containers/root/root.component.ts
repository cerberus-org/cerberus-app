import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { SidenavOptions } from '../../../models';
import { PasswordDialogComponent } from '../../../shared/components/password-dialog/password-dialog.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { AppUpdateService } from '../../services/app-update.service';
import * as ModelActions from '../../store/actions/model.actions';
import * as RouterActions from '../../store/actions/router.actions';
import { RootState } from '../../store/reducers';
import { LayoutReducerState } from '../../store/reducers/layout.reducer';
import { selectLayoutReducerState } from '../../store/selectors/layout.selectors';
import { selectModelLoadedState } from '../../store/selectors/model.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit {
  @ViewChild(SidenavComponent) sidenav: SidenavComponent;
  layoutState$: Observable<LayoutReducerState>;
  modelIsLoaded$: Observable<boolean>;
  isLoggedIn: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    private appUpdateService: AppUpdateService,
    private dialog: MatDialog,
    private store$: Store<RootState>,
  ) {
  }

  ngOnInit(): void {
    // Check if user is logged in to determine if loader should be displayed
    this.afAuth.auth.onAuthStateChanged(user => this.handleAuthStateChanged(user));
    this.layoutState$ = this.store$.pipe(
      delay(0), // Add delay to prevent change detection error
      select(selectLayoutReducerState),
    );
    this.modelIsLoaded$ = this.store$.pipe(
      delay(500), // Add delay to hide sidenav animation
      select(selectModelLoadedState),
    );
    // Load all organizations
    this.store$.dispatch(new ModelActions.LoadOrganizations());
  }

  onSelectOption(option: SidenavOptions) {
    this.store$.dispatch(option.action);
  }

  handleAuthStateChanged(user: User): void {
    this.isLoggedIn = !!user;
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
        this.openAndSubscribeToPasswordDialog();
        break;
      case 'logOut':
        this.store$.dispatch(new AuthActions.SignOut());
        break;
    }
  }

  /**
   * Open the dialog and subscribe to the observable that is returned on close
   * to extract the password. Once password is obtained dispatch the verify effect.
   */
  openAndSubscribeToPasswordDialog() {
    const subscription = this.dialog.open(PasswordDialogComponent)
      .afterClosed()
      .subscribe((password) => {
        if (password) {
          this.store$.dispatch(new AuthActions.VerifyPassword(password));
          subscription.unsubscribe();
        }
      });
  }
}
