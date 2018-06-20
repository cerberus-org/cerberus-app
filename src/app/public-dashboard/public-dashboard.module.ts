import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { PublicOrganizationDashboardComponent } from './containers/public-organization-dashboard/public-organization-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [
    PublicOrganizationDashboardComponent,
  ],
  exports: [
    PublicOrganizationDashboardComponent,
  ],
})
export class PublicDashboardModule {
}
