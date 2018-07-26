import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import { OrganizationConfirmComponent } from './components/organization-confirm/organization-confirm.component';
import { HomeComponent } from './containers/home/home.component';
import { LoginComponent } from './containers/login/login.component';
import { PublicOrganizationDashboardComponent } from './containers/public-organization-dashboard/public-organization-dashboard.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { PublicRoutingModule } from './public-routing.module';
import { signUpEffects } from './store/effects';
import { publicReducers } from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('public', publicReducers),
    EffectsModule.forFeature(signUpEffects),
    MaterialModule,
    SharedModule,
    PublicRoutingModule,
  ],
  declarations: [
    AboutUsComponent,
    EmailDialogComponent,
    HomeComponent,
    LoginComponent,
    OrganizationConfirmComponent,
    SignUpPageComponent,
    PublicOrganizationDashboardComponent,
  ],
})
export class PublicModule {
}
