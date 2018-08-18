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
            placeholder="Select a Site"
            [value]="getSiteName(site)">
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
  site: Site;

  get title(): string {
    return this.team ? this.team.name : 'Please select a team.';
  }

  getSiteName (site: Site): string {
    return site && site.name ? site.name : '';
  }

  onSelectionChange(siteName: string): void {
    this.site = this.sites.find((site: Site) => site.name === siteName);
  }
}
