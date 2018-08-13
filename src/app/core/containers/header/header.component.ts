import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { delay } from 'rxjs/operators';
import { SignOut, VerifyPassword } from '../../../auth/actions/auth.actions';
import { PasswordDialogComponent } from '../../../shared/components/password-dialog/password-dialog.component';
import { ToggleSidenavOpened } from '../../actions/layout.actions';
import { Back } from '../../actions/router.actions';
import { LayoutReducerState } from '../../reducers/layout.reducer';
import { getHeaderState, HeaderState } from '../../selectors/layout.selectors';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-header',
  template: `
    <mat-toolbar *ngIf="(headerState$ | async)" color="primary">
      <button
        *ngIf="(headerState$ | async)?.previousUrl"
        id="back-button"
        mat-icon-button
        (click)="onBack()"
      >
        <i class="material-icons">keyboard_backspace</i>
      </button>
      <button
        *ngIf="(headerState$ | async)?.showToggleSidenav"
        id="toggle-sidenav-button"
        class="show-xs"
        mat-icon-button
        (click)="onToggleSidenav()"
      >
        <mat-icon>menu</mat-icon>
      </button>
      <span class="title-text">{{(headerState$ | async)?.title}}</span>
      <span class="spacer"></span>
      <button
        *ngIf="(headerState$ | async)?.showLogOut"
        id="log-out-button"
        mat-icon-button
        (click)="onLogOut()"
      >
        <i class="material-icons">exit_to_app</i>
      </button>
    </mat-toolbar>
  `,
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
      select(getHeaderState),
    );
  }

  onToggleSidenav(): void {
    this.store$.dispatch(new ToggleSidenavOpened());
  }

  onBack(): void {
    this.store$.dispatch(new Back());
  }

  onSettings(): void {
    this.openAndSubscribeToPasswordDialog();
  }

  onLogOut(): void {
    this.store$.dispatch(new SignOut());
  }

  /**
   * Open the dialog and subscribe to the observable that is returned on close
   * to extract the password. Once password is obtained dispatch VerifyPassword.
   */
  openAndSubscribeToPasswordDialog() {
    const subscription = this.dialog.open(PasswordDialogComponent)
      .afterClosed()
      .subscribe((password) => {
        if (password) {
          this.store$.dispatch(new VerifyPassword({ password }));
          subscription.unsubscribe();
        }
      });
  }
}
