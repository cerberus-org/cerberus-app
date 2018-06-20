import { Component, Input } from '@angular/core';
import { Organization, User } from '../../../models';

@Component({
  selector: 'app-organization-confirm',
  templateUrl: './organization-confirm.component.html',
  styleUrls: ['./organization-confirm.component.scss'],
})
export class OrganizationConfirmComponent {
  @Input() organization: Organization;
  @Input() user: User;
}
