import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import * as LayoutActions from '../../../core/actions/layout.actions';
import { SetHeaderOptions } from '../../../core/actions/layout.actions';
import { Go } from '../../../core/actions/router.actions';
import { AppState } from '../../../core/reducers';
import { Organization } from '../../../shared/models';
import { LoadTeams } from '../../actions/teams.actions';
import * as fromTeams from '../../reducers';
import { CreateTeamDialogComponent } from '../create-team-dialog/create-team-dialog.component';
import { JoinTeamDialogComponent } from '../join-team-dialog/join-team-dialog.component';

@Component({
  selector: 'app-teams-page',
  template: `
    <div class="wrapper">
      <div class="grid grid--inline">
        <div class="grid__left">
          <h2 *ngIf="(teams$ | async)?.length; else noTeams">You are a member of these teams.</h2>
          <ng-template #noTeams>
            <h2>Create or join a team to get started.</h2>
          </ng-template>
        </div>
        <div class="grid__right header-buttons">
          <button mat-stroked-button color="accent" (click)="onClickCreate()">Create Team</button>
          <button mat-stroked-button color="accent" (click)="onClickFind()">Find Team</button>
        </div>
      </div>
      <mat-divider></mat-divider>
      <div class="teams-list">
        <app-team-card
          *ngFor="let team of (teams$ | async)"
          [team]="team"
          (clickActivate)="onClickActivate($event)"
          (clickSettings)="onClickSettings($event)"
        >
        </app-team-card>
      </div>
    </div>
  `,
  styleUrls: ['./teams-page.component.scss'],
})
export class TeamsPageComponent implements OnInit {
  teams$: Observable<Organization[]>;

  constructor(
    private dialog: MatDialog,
    private store$: Store<AppState>,
  ) {
    this.teams$ = store$.pipe(select(fromTeams.getAllTeams));
  }

  ngOnInit() {
    this.store$.dispatch(new SetHeaderOptions({
      title: 'Teams',
      icon: '',
      previousUrl: null,
      showSettings: false,
    }));
    this.store$.dispatch(new LayoutActions.SetSidenavOptions(null));
    this.store$.dispatch(new LoadTeams());
  }

  onClickCreate(): void {
    this.dialog.open(CreateTeamDialogComponent);
  }

  onClickFind(): void {
    this.dialog.open(JoinTeamDialogComponent);
  }

  onClickActivate(team: Organization): void {
    this.store$.dispatch(new Go({ path: ['organization/dashboard'] }));
  }

  onClickSettings(team: Organization): void {
    this.store$.dispatch(new Go({ path: ['organization/settings'] }));
  }
}
