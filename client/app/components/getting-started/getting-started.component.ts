import { Component, OnInit } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Organization } from '../../models/organization';
import { OrganizationService } from '../../services/organization.service';
import { User } from '../../models/user';
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

  constructor(private router: Router, private snackBar: MdSnackBar,
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

  onSubmit(): void {
    this.createOrganization(this.organization, this.user);
  };

  createOrganization(organization: Organization, user: User): void {
    this.organizationService.create(organization).subscribe(res => {
      const userWithOrgId = Object.assign({}, user);
      userWithOrgId.organizationId = res._id;
      this.createUser(userWithOrgId);
    }, error => this.snackBar.open(error
      ? `Error creating your organization: ${error}`
      : 'Error creating your organization!', '', {
      duration: 3000
    }));
  }

  createUser(user: User): void {
    this.userService.create(user).subscribe(
      () => {
        this.snackBar.open('Your organization was successfully added!', '', {
          duration: 3000
        });
        this.login(user);
      },
      error => this.snackBar.open(error
        ? `Error creating your user account: ${error}`
        : 'Error creating your user account!', '', {
        duration: 3000
      })
    );
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
