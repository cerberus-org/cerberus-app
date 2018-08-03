import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import { OrganizationConfirmComponent } from './components/organization-confirm/organization-confirm.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { LoginComponent } from './containers/login/login.component';
import { SignUpPageComponent } from './containers/sign-up-page/sign-up-page.component';
import { ViewActivityPageComponent } from './containers/view-activity-page/view-activity-page.component';
import { signUpEffects } from './effects';
import { PublicRoutingModule } from './public-routing.module';
import { publicReducers } from './reducers';
import { SignUpDialogComponent } from './containers/sign-up-dialog/sign-up-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('public', publicReducers),
    EffectsModule.forFeature(signUpEffects),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    PublicRoutingModule,
  ],
  declarations: [
    AboutUsComponent,
    EmailDialogComponent,
    HomePageComponent,
    LoginComponent,
    OrganizationConfirmComponent,
    SignUpPageComponent,
    ViewActivityPageComponent,
    SignUpDialogComponent,
  ],
  entryComponents: [
    EmailDialogComponent,
    SignUpDialogComponent,
  ],
})
export class PublicModule {
}
