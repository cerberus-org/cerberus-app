import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatStepperModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { SignaturePadModule } from 'angular2-signaturepad';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import 'hammerjs';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
  AboutUsComponent,
  CheckInFormComponent,
  EmailDialogComponent,
  HeaderComponent,
  LoaderComponent,
  NewVolunteerFormComponent,
  OrganizationConfirmComponent,
  PasswordDialogComponent,
  ServicesAgreementComponent,
  ServicesAgreementDialogComponent,
  SidenavComponent,
  SignatureFieldComponent,
  VolunteerMenuComponent,
} from './components';
import {
  CheckInComponent,
  FindOrganizationComponent,
  GettingStartedComponent,
  HomeComponent,
  JoinPageComponent,
  LoginComponent,
  OrganizationDashboardComponent,
} from './containers';
import { DataDisplayModule } from './data-display/data-display.module';
import {
  AuthEffects,
  CheckInEffects,
  GettingStartedEffects,
  LoginEffects,
  ModelEffects,
  RouterEffects,
  SettingsEffects,
} from './effects';
import { LoginGuard } from './login-guard';
import { PublicDashboardModule } from './public-dashboard/public-dashboard.module';
import { reducers } from './reducers';
import {
  AuthService,
  CsvService,
  ErrorService,
  OrganizationService,
  SiteService,
  SnackBarService,
  UserService,
  VisitService,
  VolunteerService,
} from './services';
import { SettingsModule } from './settings/settings.module';
import { SharedModule } from './shared/shared.module';
import { VerificationGuard } from './verification-guard';

@NgModule({
  imports: [
    DataDisplayModule,
    PublicDashboardModule,
    SettingsModule,
    SharedModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([
      AuthEffects,
      CheckInEffects,
      GettingStartedEffects,
      LoginEffects,
      ModelEffects,
      RouterEffects,
      SettingsEffects,
    ]),
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTabsModule,
    MatToolbarModule,
    MatStepperModule,
    ReactiveFormsModule,
    SignaturePadModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
  ],
  declarations: [
    AboutUsComponent,
    AppComponent,
    CheckInComponent,
    CheckInFormComponent,
    GettingStartedComponent,
    HeaderComponent,
    LoginComponent,
    FindOrganizationComponent,
    NewVolunteerFormComponent,
    OrganizationConfirmComponent,
    OrganizationDashboardComponent,
    PasswordDialogComponent,
    SignatureFieldComponent,
    VolunteerMenuComponent,
    SidenavComponent,
    JoinPageComponent,
    EmailDialogComponent,
    HomeComponent,
    ServicesAgreementComponent,
    ServicesAgreementDialogComponent,
    LoaderComponent,
  ],
  providers: [
    AuthService,
    CsvService,
    ErrorService,
    LoginGuard,
    OrganizationService,
    SiteService,
    SnackBarService,
    UserService,
    VerificationGuard,
    VisitService,
    VolunteerService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [PasswordDialogComponent, EmailDialogComponent, ServicesAgreementDialogComponent],
})
export class AppModule {
}
