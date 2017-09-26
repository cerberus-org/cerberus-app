import { Component, OnInit } from '@angular/core';

import { Location } from '../../models/location';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';
import { LocationService } from '../../services/location.service';
import { OrganizationService } from '../../services/organization.service';
import { SnackBarService } from '../../services/snack-bar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {
  error: string;
  step: number;
  validOrganization: boolean;
  validUser: boolean;
  organization: Organization;
  user: User;

  constructor(private locationService: LocationService,
              private organizationService: OrganizationService,
              private snackBarService: SnackBarService,
              private userService: UserService) { }

  ngOnInit() {
    this.step = 0;
  }

  onNext(value): void {
    this.step = this.nextStep(this.step, value);
  };

  nextStep(previous, next): number {
    return next > previous ? next : previous;
  };

  /**
   * On submit, add the following in order: Organization, Location, then User.
   */
  onSubmit(): void {
    this.createOrganization(this.organization, organization => {
      const userWithOrgId = Object.assign({}, this.user);
      userWithOrgId.organizationId = organization._id;
      this.createLocation(organization, () => {
        this.createUser(userWithOrgId, () => {
          this.snackBarService.addOrganizationSuccess();
          this.login(this.user);
        });
      });
    });
  };

  /**
   * Creates an Organization and executes a function on success.
   * @param {Organization} organization
   * @param successCb
   */
  createOrganization(organization: Organization, successCb): void {
    this.organizationService.createRx(organization, successCb);
  }

  /**
   * Creates a Location and executes a function on success.
   * @param {Organization} organization
   * @param successCb
   */
  createLocation(organization: Organization, successCb): void {
    // TODO: Get values from a new location form
    this.locationService.createRx(new Location(organization._id, organization.name, null), successCb);
  }

  /**
   * Creates a User and executes a function on success.
   * @param user
   * @param successCb
   */
  createUser(user: User, successCb): void {
    this.userService.createRx(user, successCb);
  }

  login(user: User) {
    this.userService.login(user, () => this.snackBarService.welcome(user.firstName));
  }
}
