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

  constructor(private router: Router, private snackBar: MdSnackBar, private organizationService: OrganizationService, private userService: UserService) { }

  ngOnInit() {
    this.step = 0;
  }

  setStep(value) {
    this.step = value > this.step ? value : this.step;
  };

  onSubmit() {
    this.organizationService.create(this.organization).subscribe(organization => {
      this.user.organizationId = organization._id;
      this.userService.create(this.user).subscribe(
        user => {
          this.snackBar.open('Organization was successfully added!', '', {
            duration: 3000
          });
          this.userService.login(this.user)
            .subscribe(
              response => {
                localStorage.setItem('token', response.token);
                this.router.navigateByUrl('/organization-dashboard');
              },
              err => console.log(err)
            );
        },
        error => this.snackBar.open(error
          ? `Error creating your user account: ${error}`
          : 'Error creating your user account!', '', {
          duration: 3000
        })
      );
    }, error => this.snackBar.open(error
      ? `Error creating your organization: ${error}`
      : 'Error creating your organization!', '', {
      duration: 3000
    }))
  };
}
