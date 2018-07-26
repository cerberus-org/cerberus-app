import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as LayoutActions from '../../../core/actions/layout.actions';
import { HeaderOptions, SidenavOptions } from '../../../shared/models';
import * as SettingsActions from '../../actions/settings.actions';
import { SettingsState } from '../../reducers';
import { selectSettingsSidenavOptions, selectSettingsSidenavSelection } from '../../selectors/settings.selectors';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Settings',
    'settings',
    '/organization/volunteers',
    false,
  );
  private sidenavSubscription: Subscription;
  sidenavSelection$: Observable<string>;

  constructor(public store$: Store<SettingsState>) {}

  ngOnInit(): void {
    this.sidenavSubscription = this.store$.pipe(select(selectSettingsSidenavOptions))
      .subscribe((sidenavOptions: SidenavOptions[]) => {
        this.store$.dispatch(new LayoutActions.SetSidenavOptions(sidenavOptions));
      });
    this.sidenavSelection$ = this.store$.pipe(select(selectSettingsSidenavSelection));
    this.store$.dispatch(new SettingsActions.LoadPage('USER_SETTINGS'));
    this.store$.dispatch(new LayoutActions.SetHeaderOptions(this.headerOptions));
  }

  ngOnDestroy() {
    if (this.sidenavSubscription) {
      this.sidenavSubscription.unsubscribe();
    }
  }
}
