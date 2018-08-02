import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../../../core/reducers';
import { selectModelOrganizations } from '../../../core/selectors/model.selectors';
import { Organization } from '../../models';

@Component({
  selector: 'app-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss'],
})
export class TeamSearchComponent implements OnInit, OnDestroy {
  private teamSubscription: Subscription;
  filteredOrganizations: Organization[] = [];
  organizations: Organization[];

  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;
  @Output() selectTeam = new EventEmitter<Organization>();
  @Output() iconButtonClick = new EventEmitter();
  @Input() showTitle;
  @Input() showInputIconButton;

  constructor(public store$: Store<AppState>) { }

  ngOnInit(): void {
    this.teamSubscription = this.store$.pipe(select(selectModelOrganizations))
      .subscribe((organizations) => {
        this.organizations = organizations;
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
   * Watch for changes in the organizationName input. Set filteredOrganizations on change and emit input.
   *
   * @param {Organization[]} organizations
   * @param {string} input
   */
  onOrganizationInputNameChanges(organizations: Organization[], input: string): void {
    this.filteredOrganizations = this.filterOrganizationsByName(organizations, input);
    const matchingOrganization = this.filteredOrganizations.find(organization => organization.name === input);
    this.selectTeam.emit(!!matchingOrganization ? matchingOrganization : null);
  }

  get disableIconButton(): boolean {
    return this.filteredOrganizations.length !== 1;
  }

  /**
   * Return the organizations that are equal to name or are a subset of name.
   *
   * @param {Organization[]} organizations
   * @param {string} name
   * @returns {Organization[]}
   */
  filterOrganizationsByName(organizations: Organization[], name: string): Organization[] {
    const nameLowerCase = name.toLowerCase();
    return organizations
      .filter(organization => organization.name.toLowerCase().includes(nameLowerCase));
  }
}
