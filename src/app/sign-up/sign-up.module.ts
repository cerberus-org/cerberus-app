import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { OrganizationConfirmComponent } from './components/organization-confirm/organization-confirm.component';
import { GettingStartedComponent } from './containers/getting-started/getting-started.component';
import { signUpRoutes } from './sign-up.routes';
import { signUpEffects } from './store/effects';
import { signUpReducers } from './store/reducers';

@NgModule({
  declarations: [
    AboutUsComponent,
    OrganizationConfirmComponent,
    GettingStartedComponent,
  ],
  imports: [
    RouterModule.forChild(signUpRoutes),
    StoreModule.forFeature('signUp', signUpReducers),
    EffectsModule.forFeature(signUpEffects),
    CommonModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    GettingStartedComponent,
  ],
})
export class SignUpModule {
}
