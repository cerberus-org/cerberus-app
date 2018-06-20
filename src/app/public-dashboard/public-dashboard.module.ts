import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PublicOrganizationDashboardComponent } from './containers/public-organization-dashboard/public-organization-dashboard.component';
import { publicDashboardRoutes } from './public-dashboard.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(publicDashboardRoutes),
    // Cerberus Modules
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
