import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import * as AppActions from '../../../actions/app.actions';
import * as SettingsActions from '../../../actions/settings.actions';
import { isAdmin } from '../../../functions';
import { HeaderOptions, Organization, SidenavOptions, User } from '../../../models';
import { State } from '../../../reducers';
import * as SettingsSelectors from '../../store/settings.selectors';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit, OnDestroy {
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Settings',
    'settings',
    '/dashboard',
    false,
  );
  private authSubscription: Subscription;
  sidenavSelection$: Observable<string> = this.store.pipe(select(SettingsSelectors.selectSidenavSelection));

  constructor(public store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(new SettingsActions.LoadPage('USER_SETTINGS'));
    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
    this.authSubscription = this.store.select('auth')
      .subscribe((state) => {
        if (state.user) {
          this.store.dispatch(new AppActions.SetSidenavOptions(
            this.getSidenavOptions(state.user),
          ));
        }
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  /**
   * Creates the array of sidenav options based on user role.
   * @param user - the current user
   * @returns {SidenavOptions[]} the sidenav options to display
   */
  private getSidenavOptions(user: User): SidenavOptions[] {
    const sidenavOptions = [
      new SidenavOptions(
        'User',
        'face',
        new SettingsActions.LoadPage('USER_SETTINGS'),
      ),
    ];
    return isAdmin(user)
      ? [
        ...sidenavOptions,
        new SidenavOptions(
          'Organization',
          'domain',
          new SettingsActions.LoadPage('ORGANIZATION_SETTINGS'),
        ),
        new SidenavOptions(
          'Volunteers',
          'insert_emoticon',
          new SettingsActions.LoadPage('VOLUNTEER_SETTINGS'),
        ),
        new SidenavOptions(
          'Reports',
          'assessment',
          new SettingsActions.LoadPage('REPORTS'),
        ),
        new SidenavOptions(
          'Roles',
          'lock_outline',
          new SettingsActions.LoadPage('ROLES'),
        ),
      ]
      : sidenavOptions;
  }
}
