import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Location } from '../../models/location';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';
import { LocationService } from '../../services/location.service';
import { OrganizationService } from '../../services/organization.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-getting-started',
  templateUrl: './getting-started.component.html',
  styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {
  step: number;
  validOrganization: boolean;
  validUser: boolean;
  organization: Organization;
  user: User;

  constructor(private router: Router, private snackBar: MdSnackBar, private locationService: LocationService,
              private organizationService: OrganizationService, private userService: UserService) { }

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
   * On submit, create the following in order: Organization, Location, then User.
   */
  onSubmit(): void {
    this.createOrganization(this.organization, organization => {
      const userWithOrgId = Object.assign({}, this.user);
      userWithOrgId.organizationId = organization._id;
      this.createLocation(organization, () => {
        this.createUser(userWithOrgId, () => {
          this.snackBar.open('Your organization was successfully added!', '', {
            duration: 3000
          });
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
    this.organizationService.create(organization).subscribe(successCb,
      error => this.snackBar.open(error
        ? `Error creating your organization: ${error}`
        : 'Error creating your organization!', '', {
        duration: 3000
      }));
  }

  /**
   * Creates a Location and executes a function on success.
   * @param {Organization} organization
   * @param successCb
   */
  createLocation(organization: Organization, successCb): void {
    // TODO: Create Location form to set values
    this.locationService.create(new Location(organization._id, organization.name, null)).subscribe(successCb,
      error => this.snackBar.open(error
        ? `Error creating your organization: ${error}`
        : 'Error creating your organization!', '', {
        duration: 3000
      }));
  }

  /**
   * Creates a User and executes a function on success.
   * @param user
   * @param successCb
   */
  createUser(user: User, successCb): void {
    this.userService.create(user).subscribe(successCb,
      error => this.snackBar.open(error
        ? `Error creating your user account: ${error}`
        : 'Error creating your user account!', '', {
        duration: 3000
      }));
  }

  login(user: User): void {
    this.userService.login(user)
      .subscribe(
        response => {
          localStorage.setItem('token', response.token);
          this.router.navigateByUrl('/organization-dashboard');
        },
        err => console.log(err)
      );
  }
}
