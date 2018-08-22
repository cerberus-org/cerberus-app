import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Member, Site, Team } from '../../../shared/models';
import { Roles } from '../../../shared/models/roles';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-selected-team-toolbar',
  template: `
    <div class="selected-team-toolbar">
      <h1 class="selected-team-toolbar__header">{{title}}</h1>
      <span class="spacer"></span>
      <div *ngIf="team" class="selected-team-toolbar__actions">
        <div *ngIf="memberIsApproved; else locked" class="actions-container">
          <mat-form-field>
            <mat-select
              placeholder="{{placeholder}}"
              [value]="siteNameForSelectedTeam"
              (selectionChange)="onSelectionChange($event.value)"
            >
              <mat-option>None</mat-option>
              <mat-option *ngFor="let site of sites" [value]="site.name">
                {{site.name}}
              </mat-option>
            </mat-select>
          </mat-form-field>
          <div>
            <button mat-button color="accent" (click)="clickActivate.emit({ team: team, site: site })">
              Go to Check-in
            </button>
          </div>
          <div>
            <button mat-icon-button color="accent" (click)="clickSettings.emit(team)">
              <i class="material-icons">settings</i>
            </button>
          </div>
        </div>
        <ng-template #locked>
          <div class="actions-container">
            <p class="gray-text">Your request to join is pending approval.</p>
            <div>
              <button mat-button color="accent" (click)="clickCancelRequest.emit(member)">
                Cancel request
              </button>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
    <mat-divider></mat-divider>
  `,
  styleUrls: ['./selected-team-toolbar.component.scss'],
})
export class SelectedTeamToolbarComponent {
  @Input() member: Member;
  @Input() team: Team;
  @Input() sites: Site[];
  @Output() clickActivate = new EventEmitter<{ team: Team, site: Site }>();
  @Output() clickSettings = new EventEmitter<Team>();
  @Output() clickCancelRequest = new EventEmitter<Member>();
  teamToSelectedSite = new Map<string, Site>();

  get title(): string {
    return this.team ? this.team.name : 'Please select a team.';
  }

  get placeholder(): string {
    return this.site ? '' : 'Select a Site';
  }

  get memberIsApproved(): boolean {
    return this.member && this.member.role !== Roles.Locked;
  }

  get siteNameForSelectedTeam(): string {
    return this.site && this.site.name ? this.site.name : '';
  }

  get site(): Site {
    return this.teamToSelectedSite.get(this.team.id) ? this.teamToSelectedSite.get(this.team.id) : null;
  }

  onSelectionChange(siteName: string): void {
    this.teamToSelectedSite.set(this.team.id, this.sites.find((site: Site) => site.name === siteName));
  }
}
