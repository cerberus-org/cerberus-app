import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/reducers';
import { LoadOrganizations } from '../../actions/teams.actions';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.scss'],
})
export class TeamsPageComponent implements OnInit {

  constructor(private store$: Store<AppState>) { }

  ngOnInit() {
    this.store$.dispatch(new LoadOrganizations());
  }

}
