import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { SharedModule } from '../shared/shared.module';
import { MemberService } from './services/member.service';
import { OrganizationService } from './services/organization.service';
import { SiteService } from './services/site.service';
import { VisitService } from './services/visit.service';
import { VolunteerService } from './services/volunteer.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    // Cerberus modules
    SharedModule,
  ],
  providers: [
    OrganizationService,
    SiteService,
    MemberService,
    VisitService,
    VolunteerService,
  ],
})
export class DataModule {
}
