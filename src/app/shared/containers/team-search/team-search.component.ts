import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { getAllTeams } from '../../../core/selectors/teams.selectors';
import { Team } from '../../models';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss'],
})
export class TeamSearchComponent implements OnInit, OnDestroy {
  private teamSubscription: Subscription;
  filteredTeams: Team[] = [];
  teams: Team[];

  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;
  @Output() selectTeam = new EventEmitter<Team>();
  @Output() iconButtonClick = new EventEmitter();
  @Input() showTitle;
  @Input() showInputIconButton;

  constructor(public store$: Store<AppState>) { }

  ngOnInit(): void {
    this.teamSubscription = this.store$.pipe(select(getAllTeams))
      .subscribe((teams) => {
        this.teams = teams;
      });
  }

  ngOnDestroy(): void {
    if (this.teamSubscription) {
      this.teamSubscription.unsubscribe();
    }
  }

  onIconButtonClick(): void {
    this.iconButtonClick.emit();
  }

  /**
   * Watch for changes in the teamName input. Set filteredTeams on change and emit input.
   *
   * @param {Team[]} teams
   * @param {string} input
   */
  onTeamInputNameChanges(teams: Team[], input: string): void {
    this.filteredTeams = this.filterTeamsByName(teams, input);
    const matchingTeam = this.filteredTeams.find(team => team.name === input);
    this.selectTeam.emit(!!matchingTeam ? matchingTeam : null);
  }

  get disableIconButton(): boolean {
    return this.filteredTeams.length !== 1;
  }

  /**
   * Return the teams that are equal to name or are a subset of name.
   *
   * @param {Team[]} teams
   * @param {string} name
   * @returns {Team[]}
   */
  filterTeamsByName(teams: Team[], name: string): Team[] {
    const nameLowerCase = name.toLowerCase();
    return teams
      .filter(team => team.name.toLowerCase().includes(nameLowerCase));
  }
}
