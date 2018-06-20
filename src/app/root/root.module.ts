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
import { DataModule } from '../data/data.module';
import { HomeModule } from '../home/home.module';
import { PublicDashboardModule } from '../public-dashboard/public-dashboard.module';
import { AuthService } from '../services/auth.service';
import { CsvService } from '../services/csv.service';
import { SettingsModule } from '../settings/settings.module';
import { SharedModule } from '../shared/shared.module';
import { SignUpModule } from '../sign-up/sign-up.module';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RootComponent } from './components/root/root.component';
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
} from './store/effects';
import { reducers } from './store/reducers';

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
    DataModule,
    HomeModule,
    PublicDashboardModule,
    SettingsModule,
    SharedModule,
    SignUpModule,
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
    LoginGuard,
    VerificationGuard,
  ],
  bootstrap: [RootComponent],
})
export class RootModule {
}
