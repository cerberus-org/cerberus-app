import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as AppActions from '../../actions/app.actions';
import { HeaderOptions, Organization, Visit } from '../../models';
import { State } from '../../reducers';
import { ErrorService, OrganizationService, VisitService } from '../../services';

@Component({
  selector: 'app-public-organization-dashboard',
  templateUrl: './public-organization-dashboard.component.html',
  styleUrls: ['./public-organization-dashboard.component.scss'],
})
export class PublicOrganizationDashboardComponent implements OnInit {

  private organization: Organization;
  private visits$: Observable<Visit[]>;

  constructor(public store: Store<State>,
              private organizationService: OrganizationService,
              private visitService: VisitService,
              private errorService: ErrorService) {
    this.visits$ = Observable.of();
  }

  ngOnInit() {
    this.organizationService.getByKey('name', this.getOrganizationNameByUrl(), true)
      .map((organization: Organization[]) => {
        if (organization[0]) {
          this.organization = organization[0];
          this.store.dispatch(new AppActions.SetHeaderOptions(new HeaderOptions(
            organization[0].name,
            'domain',
            '/dashboard',
            false,
          )));
          this.visits$ = this.visitService.getByKey('organizationId', organization[0].id, true);
        }
      },
           (error: any) => {
             this.errorService.handleFirebaseError(error);
           }).subscribe();
    this.store.dispatch(new AppActions.SetSidenavOptions(null));
  }

  public getOrganizationNameByUrl(): string {
    const url = window.location.href;
    return url.substr(url.lastIndexOf('/') + 1);
  }
}
