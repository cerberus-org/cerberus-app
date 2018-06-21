import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatTabsModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OrganizationConfirmComponent } from './components/organization-confirm/organization-confirm.component';
import { GettingStartedComponent } from './containers/getting-started/getting-started.component';
import { JoinPageComponent } from './containers/join-page/join-page.component';
import { signUpRoutes } from './sign-up.routes';
import { signUpEffects } from './store/effects';
import { signUpReducers } from './store/reducers';

@NgModule({
  imports: [
    RouterModule.forChild(signUpRoutes),
    StoreModule.forFeature('signUp', signUpReducers),
    EffectsModule.forFeature(signUpEffects),
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
