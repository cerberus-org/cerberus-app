import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import * as AuthActions from '../../../auth/store/actions/auth.actions';
import { SidenavOptions } from '../../../models';
import { PasswordDialogComponent } from '../../../shared/components/password-dialog/password-dialog.component';
import { SidenavComponent } from '../../components/sidenav/sidenav.component';
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
    private changeDetectorRef: ChangeDetectorRef,
    private store$: Store<RootState>,
    private dialog: MatDialog,
  ) {
    this.modelIsLoaded$ = this.store$.pipe(select(selectModelLoadedState));
    this.layoutState$ = this.store$.pipe(select(selectLayoutReducerState));
  }

  ngOnInit(): void {
    // Load all organizations
    this.store$.dispatch(new ModelActions.LoadOrganizations());
    // Check if user is logged in to determine if loader should be displayed
    this.afAuth.auth.onAuthStateChanged((user) => {
      this.isLoggedIn = !!user;
    });
  }

  onSelectIndex(option: SidenavOptions) {
    this.store$.dispatch(option.action);
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
        this.store$.dispatch(new AuthActions.SignOut());
        break;
    }
  }

  /**
   * Open the dialog and subscribe to the observable that is returned on close
   * to extract the password. Once password is obtained dispatch the verify effect.
   */
  openAndSubscribeToDialog() {
    this.dialog.open(PasswordDialogComponent)
      .afterClosed()
      .subscribe((password) => {
        if (password) {
          this.store$.dispatch(new AuthActions.VerifyPassword(password));
        }
      });
  }
}
