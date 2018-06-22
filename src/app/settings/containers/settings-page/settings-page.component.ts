import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeaderOptions } from '../../../models';
import * as AppActions from '../../../root/store/actions/app.actions';
import * as SettingsActions from '../../store/actions/settings.actions';
import { SettingsState } from '../../store/reducers';
import * as SettingsSelectors from '../../store/selectors/settings.selectors';

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
  sidenavSelection$: Observable<string> = this.store$.pipe(select(SettingsSelectors.selectSettingsSidenavSelection));

  constructor(public store$: Store<SettingsState>) {}

  ngOnInit() {
    this.store$.dispatch(new SettingsActions.LoadPage('USER_SETTINGS'));
    this.store$.dispatch(new SettingsActions.SetSettingsSidenavOptions());
    this.store$.dispatch(new AppActions.SetHeaderOptions(this.headerOptions));
  }
}
