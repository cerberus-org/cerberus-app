import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrganizationService } from './services/organization.service';
import { SiteService } from './services/site.service';
import { UserService } from './services/user.service';
import { VisitService } from './services/visit.service';
import { VolunteerService } from './services/volunteer.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [],
  providers: [
    OrganizationService,
    SiteService,
    UserService,
    VisitService,
    VolunteerService,
  ],
})
export class DataModule {
}
