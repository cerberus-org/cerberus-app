import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatIconModule, MatListModule, MatStepperModule,
  MatTabsModule,
} from '@angular/material';

import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OrganizationConfirmComponent } from './components/organization-confirm/organization-confirm.component';
import { GettingStartedComponent } from './containers/getting-started/getting-started.component';
import { JoinPageComponent } from './containers/join-page/join-page.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatTabsModule,
    // Cerberus Modules
    SharedModule,
  ],
  declarations: [
    AboutUsComponent,
    OrganizationConfirmComponent,
    GettingStartedComponent,
    JoinPageComponent,
  ],
  exports: [
    GettingStartedComponent,
    JoinPageComponent,
  ],
})
export class SignUpModule {
}
