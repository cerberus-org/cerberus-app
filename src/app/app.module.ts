import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import 'hammerjs';

import { environment } from '../environments/environment';
import { CheckInModule } from './check-in/check-in.module';

import { HeaderComponent, LoaderComponent, SidenavComponent } from './components/index';
import {
  AuthEffects,
  CheckInEffects,
  GettingStartedEffects,
  LoginEffects,
  ModelEffects,
  RouterEffects,
  SettingsEffects,
} from './effects/index';
import { HomeModule } from './home/home.module';
import { PublicDashboardModule } from './public-dashboard/public-dashboard.module';
import { reducers } from './reducers/index';
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
} from './services/index';
import { SettingsModule } from './settings/settings.module';
import { SharedModule } from './shared/shared.module';
import { SignUpModule } from './sign-up/sign-up.module';
import { AppComponent } from './app.component';
import { LoginGuard } from './login-guard';
import { routes } from './routes';
import { VerificationGuard } from './verification-guard';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    RouterModule.forRoot(routes),
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
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule,
    // Cerberus Modules
    CheckInModule,
    PublicDashboardModule,
    SignUpModule,
    SettingsModule,
    SharedModule,
    HomeModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
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
})
export class AppModule {
}
