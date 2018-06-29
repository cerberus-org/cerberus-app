import { Component, Input } from '@angular/core';
import { Organization, Member } from '../../../models';
import { Credentials } from '../../../models/credentials';

@Component({
  selector: 'app-organization-confirm',
  templateUrl: './organization-confirm.component.html',
  styleUrls: ['./organization-confirm.component.scss'],
})
export class OrganizationConfirmComponent {
  @Input() organization: Organization;
  @Input() email: string;
  @Input() member: Member;
}
