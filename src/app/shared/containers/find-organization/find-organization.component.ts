import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Organization } from '../../../models';
import { RootState } from '../../../root/store/reducers';
import { selectModelOrganizations } from '../../../root/store/selectors/model.selectors';

@Component({
  selector: 'app-find-organization',
  templateUrl: './find-organization.component.html',
  styleUrls: ['./find-organization.component.scss'],
})
export class FindOrganizationComponent implements OnInit, OnDestroy {
  private organizationsSubscription: Subscription;
  filteredOrganizations: Organization[] = [];
  organizations: Organization[];

  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;
  @Output() validOrganization = new EventEmitter<Organization>();
  @Output() iconButtonClick = new EventEmitter();
  @Input() showTitle;
  @Input() showInputIconButton;

  constructor(public store$: Store<RootState>) { }

  ngOnInit(): void {
    this.organizationsSubscription = this.store$.pipe(select(selectModelOrganizations))
      .subscribe((organizations) => {
        this.organizations = organizations;
      });
  }

  ngOnDestroy(): void {
    if (this.organizationsSubscription) {
      this.organizationsSubscription.unsubscribe();
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
    this.validOrganization.emit(
      this.filteredOrganizations.length === 1
        ? this.filteredOrganizations[0]
        : null,
    );
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
