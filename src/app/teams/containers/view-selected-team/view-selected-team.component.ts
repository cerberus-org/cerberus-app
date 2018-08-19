import { Component, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { Go } from '../../../core/actions/router.actions';
import { LoadSitesForTeam } from '../../../core/actions/sites.actions';
import { LoadVisitsForTeam } from '../../../core/actions/visits.actions';
import { AppState } from '../../../core/reducers';
import { getMemberForCurrentUserAndSelectedTeam } from '../../../core/selectors/members.selectors';
import { getSitesForSelectedTeam } from '../../../core/selectors/sites.selectors';
import { getSelectedTeam } from '../../../core/selectors/teams.selectors';
import { getVisitsForSelectedTeam } from '../../../core/selectors/visits.selectors';
import { RemoveMember } from '../../../settings/actions/settings.actions';
import { Member, Site, Team, Visit } from '../../../shared/models';
import { CancelRequest } from '../../actions/teams-page.actions';

@Component({
  selector: 'app-view-selected-team',
  template: `
    <div class="table-container">
      <app-selected-team-toolbar
        [member]="(currentMember$ | async)"
        [team]="(selectedTeam$ | async)"
        [sites]="(sites$ | async)"
        (clickActivate)="onClickActivate($event)"
        (clickSettings)="onClickSettings($event)"
        (clickCancelRequest)="onClickCancelRequest($event)"
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
  currentMember$: Observable<Member>;
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
    this.currentMember$ = store$.pipe(select(getMemberForCurrentUserAndSelectedTeam));
    this.visits$ = store$.pipe(select(getVisitsForSelectedTeam));
    this.sites$ = store$.pipe(select(getSitesForSelectedTeam));
  }

  ngOnDestroy() {
    this.selectedTeamSubscription.unsubscribe();
  }

  onClickActivate(teamAndSite: any): void {
    teamAndSite.site ? this.store$.dispatch(new Go({ path: ['teams', teamAndSite.team.id, 'sites', teamAndSite.site.id, 'volunteers'] }))
      : this.store$.dispatch(new Go({ path: ['teams', teamAndSite.team.id, 'volunteers'] }));
  }

  onClickSettings(team: Team): void {
    this.store$.dispatch(new Go({ path: ['teams', team.id, 'settings'] }));
  }

  onClickCancelRequest(member: Member): void {
    this.store$.dispatch(new CancelRequest({ member }));
  }
}
