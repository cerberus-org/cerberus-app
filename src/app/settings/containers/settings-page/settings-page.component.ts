import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HeaderOptions, SidenavOptions } from '../../../models';
import * as AppActions from '../../../root/store/actions/app.actions';
import * as SettingsActions from '../../store/actions/settings.actions';
import { SettingsState } from '../../store/reducers';
import { selectSettingsSidenavOptions, selectSettingsSidenavSelection } from '../../store/selectors/settings.selectors';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent implements OnInit {
  private headerOptions: HeaderOptions = new HeaderOptions(
    'Settings',
    'settings',
    '/dashboard',
    false,
  );
  private sidenavSubscription: Subscription;
  sidenavSelection$: Observable<string>;

  constructor(public store$: Store<SettingsState>) {}

  ngOnInit(): void {
    this.sidenavSubscription = this.store$.pipe(select(selectSettingsSidenavOptions))
      .subscribe((sidenavOptions: SidenavOptions[]) => {
        this.store$.dispatch(new AppActions.SetSidenavOptions(sidenavOptions));
      });
    this.sidenavSelection$ = this.store$.pipe(select(selectSettingsSidenavSelection));
    this.store$.dispatch(new SettingsActions.LoadPage('USER_SETTINGS'));
    this.store$.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
  }

  ngOnDestroy() {
    if (this.sidenavSubscription) {
      this.sidenavSubscription.unsubscribe();
    }
  }
}
