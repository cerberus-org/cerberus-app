import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PublicOrganizationDashboardComponent } from '../containers';
import { SharedModule } from '../shared/shared.module';

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
