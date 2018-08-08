import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { map } from 'rxjs/operators';
import { SetHeaderOptions, SetSidenavOptions } from '../../../core/actions/layout.actions';
import { LoadMembersForUser } from '../../../core/actions/members.actions';
import { LoadTeams, SelectTeam } from '../../../core/actions/teams.actions';
import { AppState } from '../../../core/reducers';
import { getTeamsForUser } from '../../../core/selectors/teams.selectors';
import { Team } from '../../../shared/models';
import { OpenCreateTeamDialog, OpenFindTeamDialog } from '../../actions/teams-page.actions';

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
    store$.dispatch(new LoadMembersForUser());
    store$.dispatch(new LoadTeams());
    this.teams$ = store$.pipe(select(getTeamsForUser));
    this.sidenavSubscription = this.teams$.pipe(
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
          action: new SelectTeam({ teamId: team.id }),
        })),
      ])),
    )
      .subscribe(store$);
  }

  ngOnDestroy(): void {
    this.sidenavSubscription.unsubscribe();
  }
}
