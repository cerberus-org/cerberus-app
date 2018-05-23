import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/index';

import * as AppActions from '../../actions/app.actions';
import { HeaderOptions, Organization, Visit } from '../../models';
import { State } from '../../reducers';
import { ErrorService, OrganizationService, VisitService } from '../../services';

@Component({
  selector: 'app-public-organization-dashboard',
  templateUrl: './public-organization-dashboard.component.html',
  styleUrls: ['./public-organization-dashboard.component.scss'],
})
export class PublicOrganizationDashboardComponent implements OnInit, OnDestroy {
  private organization: Organization;
  private visits$: Observable<Visit[]>;
  showNotFound: boolean;
  subscription: Subscription;

  constructor(
    public store: Store<State>,
    private organizationService: OrganizationService,
    private visitService: VisitService,
    private errorService: ErrorService,
  ) {}

  ngOnInit() {
    this.subscription = this.organizationService.getByKey('name', this.getOrganizationNameByUrl(), true)
      .subscribe(
        (organizations: Organization[]) => {
          const organization = organizations[0];
          if (organization) {
            this.organization = organization;
            this.visits$ = this.visitService.getByKey('organizationId', organization.id, true);
          }
          this.store.dispatch(new AppActions.SetHeaderOptions(new HeaderOptions(
            organization ? organization.name : '',
            null,
            '/dashboard',
            false,
          )));
          // Only display error after attempting to fetch organization
          this.showNotFound = organizations.length === 0;
        },
        (error: any) => {
          this.errorService.handleFirebaseError(error);
        },
      );
    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }

  public getOrganizationNameByUrl(): string {
    const url = window.location.href;
    return decodeURI(url.substr(url.lastIndexOf('/') + 1));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
