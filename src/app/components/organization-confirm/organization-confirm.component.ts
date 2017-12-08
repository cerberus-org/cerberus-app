import { Component, Input, OnInit } from '@angular/core';

import { Organization } from '../../models/organization';
import { User } from '../../models/user';

@Component({
  selector: 'app-organization-confirm',
  templateUrl: './organization-confirm.component.html',
  styleUrls: ['./organization-confirm.component.scss']
})
export class OrganizationConfirmComponent implements OnInit {
  @Input() organization: Organization;
  @Input() user: User;

  constructor() { }

  ngOnInit() { }

}
