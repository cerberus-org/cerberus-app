import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocomplete } from '@angular/material';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as ModelActions from '../../actions/model.actions';
import { Organization } from '../../models';
import { State } from '../../reducers';

@Component({
  selector: 'app-find-organization',
  templateUrl: './find-organization.component.html',
  styleUrls: ['./find-organization.component.scss'],
})
export class FindOrganizationComponent implements OnInit {

  filteredOrganizations: Organization[];
  organizations: Organization[];
  modelSubscription: Subscription;

  @ViewChild(MatAutocomplete) autocomplete: MatAutocomplete;
  @Output() validInput = new EventEmitter();
  @Input() title;

  constructor(public store: Store<State>) { }

  ngOnInit() {
    this.modelSubscription = this.store.select('model')
      .subscribe((state) => {
        if (state.organizations) {
          this.organizations = state.organizations;
        }
      });
  }

  emitInput(input: string) {
    input !== null || input !== '' ? this.validInput.emit(input) : null;
  }

  /**
   * Watch for changes in the organizationName input. Set filteredOrganizations on change and emit input.
   *
   * @param {Organization[]} organizations
   * @param {string} input
   */
  onOrganizationInputNameChanges(organizations: Organization[], input: string) {
    this.emitInput(input);
    this.filteredOrganizations = this.filterOrganizationsByName(organizations, input);
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
