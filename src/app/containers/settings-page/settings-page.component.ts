import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }

}
