import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { SidenavOptions } from '../../../shared/models';
import * as LayoutActions from '../../actions/layout.actions';
import { LayoutReducerState } from '../../reducers/layout.reducer';
import { getSidenavOptions, getSidenavState, SidenavState } from '../../selectors/layout.selectors';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit, OnDestroy {
  @ViewChild(MatSidenav) sidenav: MatSidenav;
  sidenavState$: Observable<SidenavState>;
  sidenavOptionsSubscription: Subscription;
  mobileQuery: MediaQueryList;
  mode: string;

  private mobileQueryListener: () => void;

  constructor(
    private media: MediaMatcher,
    private store$: Store<LayoutReducerState>,
  ) {}

  ngOnInit(): void {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this.mobileQuery.addListener(() => this.setForScreen(this.mobileQuery.matches));
    this.sidenavState$ = this.store$.pipe(
      select(getSidenavState),
    );
    this.sidenavOptionsSubscription = this.store$.pipe(
      select(getSidenavOptions),
    ).subscribe((options) => {
      if (options && options.length) {
        this.setForScreen(this.mobileQuery.matches);
      } else {
        this.store$.dispatch(new LayoutActions.SetSidenavOpened(false));
      }
    });
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
    this.sidenavOptionsSubscription.unsubscribe();
  }

  /**
   * Handles click events from an option by dispatching the action for the selected option.
   * @param {SidenavOptions} option - the selected option
   */
  onClick(option: SidenavOptions): void {
    this.store$.dispatch(option.action);
  }

  /**
   * Sets the sidenav for xs screen size or larger.
   * @param xs - true if xs screen size
   */
  setForScreen(xs: boolean): void {
    if (xs) {
      this.mode = 'over';
      this.sidenav.disableClose = false;
      this.store$.dispatch(new LayoutActions.SetSidenavOpened(false));
    } else {
      this.mode = 'side';
      this.sidenav.disableClose = true;
      this.store$.dispatch(new LayoutActions.SetSidenavOpened(true));
    }
  }
}
