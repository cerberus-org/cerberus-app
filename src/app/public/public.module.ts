import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';
import { EmailDialogComponent } from './components/email-dialog/email-dialog.component';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { LoginComponent } from './containers/login/login.component';
import { SignUpDialogComponent } from './containers/sign-up-dialog/sign-up-dialog.component';
import { ViewActivityPageComponent } from './containers/view-activity-page/view-activity-page.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    PublicRoutingModule,
  ],
  declarations: [
    EmailDialogComponent,
    HomePageComponent,
    LoginComponent,
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
