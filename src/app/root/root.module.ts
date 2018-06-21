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
import 'hammerjs';
import { environment } from '../../environments/environment';
import { AuthModule } from '../auth/auth.module';
import { CheckInModule } from '../check-in/check-in.module';
import { DataModule } from '../data/data.module';
import { HomeModule } from '../home/home.module';
import { PublicDashboardModule } from '../public-dashboard/public-dashboard.module';
import { SettingsModule } from '../settings/settings.module';
import { SharedModule } from '../shared/shared.module';
import { SignUpModule } from '../sign-up/sign-up.module';
import { HeaderComponent } from './components/header/header.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RootComponent } from './components/root/root.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { routes } from './root.routes';
import { rootEffects } from './store/effects';
import { rootReducers } from './store/reducers';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot(routes),
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot(rootEffects),
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    StoreRouterConnectingModule,
    // Cerberus Modules
    AuthModule,
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
  providers: [],
  bootstrap: [RootComponent],
})
export class RootModule {
}
