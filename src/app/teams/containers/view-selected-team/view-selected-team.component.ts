import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, switchMap } from 'rxjs/operators';

import { Go } from '../../../core/actions/router.actions';
import { LoadSitesForTeam } from '../../../core/actions/sites.actions';
import { LoadVisitsForTeam } from '../../../core/actions/visits.actions';
import { AppState } from '../../../core/reducers';
import { getSitesForSelectedTeam } from '../../../core/selectors/sites.selectors';
import { getSelectedTeam } from '../../../core/selectors/teams.selectors';
import { getVisitsForSelectedTeam } from '../../../core/selectors/visits.selectors';
import { Site, Team, Visit } from '../../../shared/models';

@Component({
  selector: 'app-view-selected-team',
  template: `
    <div class="container">
      <app-selected-team-toolbar
        [team]="(selectedTeam$ | async)"
        (clickActivate)="onClickActivate($event)"
        (clickSettings)="onClickSettings($event)"
      >
      </app-selected-team-toolbar>
      <app-data-display [visits$]="visits$" [sites$]="sites$"></app-data-display>
    </div>
  `,
  styleUrls: ['./view-selected-team.component.scss'],
})
export class ViewSelectedTeamComponent implements OnDestroy {
  selectedTeam$: Observable<Team>;
  visits$: Observable<Visit[]>;
  sites$: Observable<Site[]>;
  selectedTeamSubscription: Subscription;

  constructor(private store$: Store<AppState>) {
    this.selectedTeam$ = store$.pipe(select(getSelectedTeam));
    this.selectedTeamSubscription = store$.pipe(
      select(getSelectedTeam),
      filter(team => !!team),
      switchMap(({ id }) => [
        new LoadVisitsForTeam({ teamId: id }),
        new LoadSitesForTeam({ teamId: id }),
      ]),
    )
      .subscribe(store$);
    this.visits$ = store$.pipe(select(getVisitsForSelectedTeam));
    this.sites$ = store$.pipe(select(getSitesForSelectedTeam));
  }

  ngOnDestroy() {
    this.selectedTeamSubscription.unsubscribe();
  }

  onClickActivate(team: Team): void {
    this.store$.dispatch(new Go({ path: ['teams', team.id, 'volunteers'] }));
  }

  onClickSettings(team: Team): void {
    this.store$.dispatch(new Go({ path: ['teams', team.id, 'settings'] }));
  }
}
