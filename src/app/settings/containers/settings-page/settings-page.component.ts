import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Rx';

import * as AppActions from '../../../actions/app.actions';
import * as SettingsActions from '../../../actions/settings.actions';
import { isAdmin } from '../../../functions';
import { HeaderOptions, Organization, SidenavOptions, User, Volunteer, } from '../../../models';
import { State } from '../../../reducers';

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
  private settingsSubscription: Subscription;
  settings$: Observable<State['settings']>;
  users: User[];
  volunteers: Volunteer[];
  sidenavSelection: string;

  organizationChanges: Organization;

  constructor(
    public store: Store<State>,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new SettingsActions.LoadPage('USER_SETTINGS'));
    this.authSubscription = this.store.select('auth')
      .subscribe((state) => {
        if (state.user) {
          this.store.dispatch(new AppActions.SetSidenavOptions(
            this.getSidenavOptions(state.user),
          ));
        }
      });
    this.settingsSubscription = this.store.select('settings')
      .subscribe((state) => {
        this.sidenavSelection = state.sidenavSelection;
        this.changeDetectorRef.detectChanges();
      });
    this.store.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.settingsSubscription) {
      this.settingsSubscription.unsubscribe();
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