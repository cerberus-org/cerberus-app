import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ErrorService } from '../../../core/services/error.service';
import { OrganizationService } from '../../../core/services/organization.service';
import { VisitService } from '../../../core/services/visit.service';
import * as LayoutActions from '../../../core/actions/layout.actions';
import { AppState } from '../../../core/reducers';
import { HeaderOptions, Organization, Visit } from '../../../shared/models';

@Component({
  selector: 'app-view-activity-page',
  templateUrl: './view-activity-page.component.html',
  styleUrls: ['./view-activity-page.component.scss'],
})
export class ViewActivityPageComponent implements OnInit, OnDestroy {
  organization: Organization;
  visits$: Observable<Visit[]>;
  showNotFound: boolean;
  subscription: Subscription;

  constructor(
    public store$: Store<AppState>,
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
            '/organization/volunteers',
            false,
          )));
          // Only display error after attempting to fetch organization
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
