import { Component, Input } from '@angular/core';
import { Member, Organization } from '../../../shared/models';

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
