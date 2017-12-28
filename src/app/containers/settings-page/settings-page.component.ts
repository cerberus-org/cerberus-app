import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppActions from '../../actions/app.actions';
import { HeaderOptions } from '../../models/header-options';
import { State } from '../../reducers/index';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new AppActions.SetHeaderOptions(
      new HeaderOptions(
        'Settings',
        'settings',
        '/dashboard'
      )
    ));
    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }
}
