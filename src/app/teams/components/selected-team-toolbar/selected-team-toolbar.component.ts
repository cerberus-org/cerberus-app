import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Site, Team } from '../../../shared/models';

@Component({
  selector: 'app-selected-team-toolbar',
  template: `
    <div class="container">
      <h1 class="container--header">{{title}}</h1>
      <span class="spacer"></span>
      <div *ngIf="team">
        <mat-form-field class="container--actions">
          <mat-select
            (selectionChange)="onSelectionChange($event.value)"
            placeholder={{placeholder}}
            [value]="siteNameForSelectedTeam">
            <mat-option *ngFor="let site of sites" [value]="site.name">
              {{site.name}}
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-button class="container--actions" color="primary" (click)="clickActivate.emit({ team: team, site: site })">Go to Check-in</button>
        <button mat-icon-button class="container--actions" color="accent" (click)="clickSettings.emit(team)">
          <i class="material-icons">settings</i>
        </button>
      </div>
    </div>
    <mat-divider></mat-divider>
  `,
  styleUrls: ['./selected-team-toolbar.component.scss'],
})
export class SelectedTeamToolbarComponent {
  @Input() team: Team;
  @Input() sites: Site[];
  @Output() clickActivate = new EventEmitter<[Team & Site]>();
  @Output() clickSettings = new EventEmitter<Team>();
  teamToSelectedSite = new Map<string, Site>();

  get title(): string {
    return this.team ? this.team.name : 'Please select a team.';
  }

  get placeholder(): string {
    return this.site ? '' : 'Select a Site';
  }

  get siteNameForSelectedTeam (): string {
    return this.site && this.site.name ? this.site.name : '';
  }

  get site(): Site {
    return this.teamToSelectedSite.get(this.team.id) ? this.teamToSelectedSite.get(this.team.id) : null;
  }

  onSelectionChange(siteName: string): void {
    this.teamToSelectedSite.set(this.team.id, this.sites.find((site: Site) => site.name === siteName));
  }
}
