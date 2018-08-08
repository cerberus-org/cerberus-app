import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { filter, switchMap } from 'rxjs/operators';
import { LoadSites, LoadVisits } from '../../../core/actions/model.actions';
import { Go } from '../../../core/actions/router.actions';
import { AppState } from '../../../core/reducers';
import { selectModelVisits } from '../../../core/selectors/model.selectors';
import { getSelectedTeam } from '../../../core/selectors/teams.selectors';
import { Team, Visit } from '../../../shared/models';

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
      <app-data-display [visits$]="visits$"></app-data-display>
    </div>
  `,
  styleUrls: ['./view-selected-team.component.scss'],
})
export class ViewSelectedTeamComponent implements OnDestroy {
  selectedTeam$: Observable<Team>;
  visits$: Observable<Visit[]>;
  selectedTeamSubscription: Subscription;

  constructor(private store$: Store<AppState>) {
    this.selectedTeam$ = store$.pipe(select(getSelectedTeam));
    this.selectedTeamSubscription = store$.pipe(
      select(getSelectedTeam),
      filter(team => !!team),
      switchMap(({ id }) => [
        new LoadVisits(id),
        new LoadSites(id),
      ]),
    )
      .subscribe(store$);
    this.visits$ = store$.pipe(select(selectModelVisits));
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
