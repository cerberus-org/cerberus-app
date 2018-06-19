import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PublicOrganizationDashboardComponent } from '../containers';
import { DataDisplayModule } from '../data-display/data-display.module';

@NgModule({
  imports: [
    CommonModule,
    DataDisplayModule,
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
