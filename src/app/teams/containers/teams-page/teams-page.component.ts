import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { AppState } from '../../../core/reducers';
import { Organization } from '../../../shared/models';
import { LoadTeams } from '../../actions/teams.actions';
import * as fromTeams from '../../reducers';

@Component({
  selector: 'app-teams-page',
  template: `
    <p *ngFor="let team of (teams$ | async)">
      {{team}}
    </p>
  `,
  styleUrls: ['./teams-page.component.scss'],
})
export class TeamsPageComponent implements OnInit {
  teams$: Observable<Organization[]>;

  constructor(private store$: Store<AppState>) {
    this.teams$ = store$.pipe(select(fromTeams.getAllTeams));
  }

  ngOnInit() {
    this.store$.dispatch(new LoadTeams());
  }

}
