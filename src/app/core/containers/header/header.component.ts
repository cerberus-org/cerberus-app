import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/operators';
import * as AuthActions from '../../../auth/actions/auth.actions';
import { PasswordDialogComponent } from '../../../shared/components/password-dialog/password-dialog.component';
import * as LayoutActions from '../../actions/layout.actions';
import * as RouterActions from '../../actions/router.actions';
import { LayoutReducerState } from '../../reducers/layout.reducer';
import { HeaderState, selectHeaderState } from '../../selectors/layout.selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<string>();
  headerState$: Observable<HeaderState>;

  constructor(
    private store$: Store<LayoutReducerState>,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.headerState$ = this.store$.pipe(
      delay(0),
      select(selectHeaderState),
    );
  }

  onToggleSidenav(): void {
    this.store$.dispatch(new LayoutActions.ToggleSidenavOpened());
  }

  onBack(): void {
    this.store$.dispatch(new RouterActions.Back());
  }

  onSettings(): void {
    this.openAndSubscribeToPasswordDialog();
  }

  onLogOut(): void {
    this.store$.dispatch(new AuthActions.SignOut());
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
