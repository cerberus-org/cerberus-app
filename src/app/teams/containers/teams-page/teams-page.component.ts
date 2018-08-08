import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { SetHeaderOptions, SetSidenavOptions } from '../../../core/actions/layout.actions';
import { AppState } from '../../../core/reducers';
import { Team } from '../../../shared/models';
import { LoadTeams, OpenCreateTeamDialog, OpenFindTeamDialog, SelectTeam } from '../../actions/teams-page.actions';
import * as fromTeams from '../../reducers';

@Component({
  selector: 'app-teams-page',
  template: `
    <app-view-selected-team></app-view-selected-team>
  `,
  styleUrls: ['./teams-page.component.scss'],
})
export class TeamsPageComponent implements OnDestroy {
  sidenavSubscription: Subscription;
  teams$: Observable<Team[]>;

  constructor(private store$: Store<AppState>) {
    store$.dispatch(new SetHeaderOptions({
      title: 'Teams',
      previousUrl: null,
      showLogOut: true,
    }));
    store$.dispatch(new LoadTeams());
    this.teams$ = store$.pipe(select(fromTeams.getAllTeams));
    this.sidenavSubscription = store$.pipe(
      select(fromTeams.getAllTeams),
      map(teams => new SetSidenavOptions([
        {
          label: 'Create Team',
          icon: 'group_work',
          action: new OpenCreateTeamDialog(),
        },
        {
          label: 'Join Team',
          icon: 'search',
          action: new OpenFindTeamDialog(),
        },
        ...teams.map(team => ({
          label: team.name,
          icon: null,
          action: new SelectTeam({ team }),
        })),
      ])),
    )
      .subscribe(store$);
  }

  ngOnDestroy(): void {
    this.sidenavSubscription.unsubscribe();
  }
}
