import { Component, OnInit } from '@angular/core';
import { Organization } from '../../models/organization';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { OrganizationService } from '../../services/organization.service';
import { MdSnackBar } from '@angular/material';

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

  constructor(private snackBar: MdSnackBar, private organizationService: OrganizationService, private userService: UserService) { }

  ngOnInit() {
    this.step = 0;
  }

  setStep(value) {
    this.step = value > this.step ? value : this.step;
  };

  onSubmit() {
    this.organizationService.create(this.organization).subscribe(organization => {
      const user = Object.assign({}, this.user);
      user.organizationId = organization.organizationId;
      this.userService.create(user).subscribe(
        () =>
          this.snackBar.open('Organization was successfully created!', '', {
            duration: 3000
          }),
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
