import { Component, OnInit, ViewChild } from '@angular/core';
import { MatVerticalStepper } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';
import { OrganizationService } from '../../../data/services/organization.service';
import { HeaderOptions, Organization, User } from '../../../models';
import * as LayoutActions from '../../../root/store/actions/layout.actions';
import * as RouterActions from '../../../root/store/actions/router.actions';
import { RootState } from '../../../root/store/reducers';
import { selectModelOrganizations } from '../../../root/store/selectors/model.selectors';
import { ErrorService } from '../../../shared/services/error.service';
import { SnackBarService } from '../../../shared/services/snack-bar.service';

@Component({
  selector: 'app-join-page',
  templateUrl: './join-page.component.html',
  styleUrls: ['./join-page.component.scss'],
})
export class JoinPageComponent implements OnInit {

  private headerOptions: HeaderOptions = new HeaderOptions(
    'Cerberus',
    'group_work',
    '/home',
    false,
  );

  @ViewChild('stepper') stepper: MatVerticalStepper;

  validInput: string;
  validUser: User;
  userFormTitle: string;
  organizations: Organization[];
  modelSubscription: Subscription;
  isTosChecked: boolean;

  constructor(
    private authService: AuthService,
    private organizationService: OrganizationService,
    private errorService: ErrorService,
    private store$: Store<RootState>,
    private snackBarService: SnackBarService,
  ) {
    this.userFormTitle = 'Please enter your information.';
  }

  ngOnInit(): void {
    this.modelSubscription = this.store$.pipe(select(selectModelOrganizations))
      .subscribe((organizations) => {
        this.organizations = organizations;
      });
    this.store$.dispatch(new LayoutActions.SetHeaderOptions(this.headerOptions));
    this.store$.dispatch(new LayoutActions.SetSidenavOptions(null));
  }

  /**
   * Handles validUser events by setting validUser.
   *
   * @param {User} user
   */
  onValidUser(user: User) {
    this.validUser = user;
  }

  /**
   * Handles validInput events by setting validInput.
   *
   * @param {string} organizationName
   */
  onValidInput(organizationName: string) {
    this.validInput = organizationName;
  }

  /**
   * Return Organization given name.
   *
   * @param {string} organizationName
   * @returns {Organization}
   */
  getOrganizationByName(organizationName: string): Organization {
    return this.organizations.find((organization: Organization) => {
      return organization.name === organizationName;
    });
  }

  onNext(index: number): void {
    this.stepper.selectedIndex = index;
  }

  /**
   * On submit, validate organization, create user, log user out and display snack bar on success.
   */
  onJoinOrganization() {
    const organization = this.getOrganizationByName(this.validInput);
    if (organization) {
      this.authService.createUser({
        ...this.validUser,
        organizationId: organization.id,
        role: 'unverified',
      })
        .subscribe(() => {
          this.authService.signOut();
          this.snackBarService.requestToJoinOrganizationSuccess();
          this.store$.dispatch(new RouterActions.Go({ path: ['/home'] }));
        });
    } else {
      this.snackBarService.invalidOrganization();
    }
  }

  onCheck(e): void {
    this.isTosChecked = e.checked;
  }
}
