import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { OrganizationService } from '../../../data/services/organization.service';
import { VisitService } from '../../../data/services/visit.service';
import { HeaderOptions, Organization, Visit } from '../../../models';
import * as LayoutActions from '../../../root/store/actions/layout.actions';
import { RootState } from '../../../root/store/reducers';
import { ErrorService } from '../../../shared/services/error.service';

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
    public store$: Store<RootState>,
    private organizationService: OrganizationService,
    private visitService: VisitService,
    private errorService: ErrorService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.organizationService.getByKey('name', this.getOrganizationNameByUrl(), true)
      .subscribe(
        (organizations: Organization[]) => {
          const organization = organizations[0];
          if (organization) {
            this.organization = organization;
            this.visits$ = this.visitService.getByKey('organizationId', organization.id, true);
          }
          this.store$.dispatch(new LayoutActions.SetHeaderOptions(new HeaderOptions(
            organization ? organization.name : '',
            null,
            '/dashboard',
            false,
          )));
          // Only display error after attempting to fetch validOrganization
          this.showNotFound = organizations.length === 0;
        },
        (error: any) => {
          this.errorService.handleFirebaseError(error);
        },
      );
    this.store$.dispatch(new LayoutActions.SetSidenavOptions(null));
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
