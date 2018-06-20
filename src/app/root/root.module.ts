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

import { environment } from '../../environments/environment';
import { CheckInModule } from '../check-in/check-in.module';
import { HomeModule } from '../home/home.module';
import { PublicDashboardModule } from '../public-dashboard/public-dashboard.module';
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
} from '../services/index';
import { SettingsModule } from '../settings/settings.module';
import { SharedModule } from '../shared/shared.module';
import { SignUpModule } from '../sign-up/sign-up.module';
import { RootComponent } from './components/app/root.component';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { LoginGuard } from './guards/login-guard';
import { VerificationGuard } from './guards/verification-guard';
import { routes } from './root.routes';

import {
  AuthEffects,
  CheckInEffects,
  GettingStartedEffects,
  LoginEffects,
  ModelEffects,
  RouterEffects,
  SettingsEffects,
} from './store/effects/index';
import { reducers } from './store/reducers/index';

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
    RootComponent,
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
  bootstrap: [RootComponent],
})
export class AppModule {
}
