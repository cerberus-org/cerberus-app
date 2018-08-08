import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { SetHeaderOptions, SetSidenavOptions } from '../../../core/actions/layout.actions';
import { AppState } from '../../../core/reducers';
import { ErrorService } from '../../../core/services/error.service';
import { TeamService } from '../../../core/services/team.service';
import { VisitService } from '../../../core/services/visit.service';
import { Team, Visit } from '../../../shared/models';

@Component({
  selector: 'app-view-activity-page',
  templateUrl: './view-activity-page.component.html',
  styleUrls: ['./view-activity-page.component.scss'],
})
export class ViewActivityPageComponent implements OnInit, OnDestroy {
  team: Team;
  visits$: Observable<Visit[]>;
  showNotFound: boolean;
  subscription: Subscription;

  constructor(
    public store$: Store<AppState>,
    private teamService: TeamService,
    private visitService: VisitService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.teamService.getByKey('name', this.getTeamNameByUrl(), true)
      .subscribe(
        (teams: Team[]) => {
          const team = teams[0];
          if (team) {
            this.team = team;
            this.visits$ = this.visitService.getByKey('teamId', team.id, true);
          }
          this.store$.dispatch(new SetHeaderOptions({
            headerOptions: {
              title: team ? team.name : '',
              previousUrl: '',
              showLogOut: false,
            },
          }));
          // Only display error after attempting to fetch team
          this.showNotFound = teams.length === 0;
        },
        (error: any) => {
          this.errorService.handleFirebaseError(error);
        },
      );
    this.store$.dispatch(new SetSidenavOptions(null));
  }

  public getTeamNameByUrl(): string {
    const url = window.location.href;
    return decodeURI(url.substr(url.lastIndexOf('/') + 1));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
