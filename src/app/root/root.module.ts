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
import { ServiceWorkerModule } from '@angular/service-worker';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from 'angularfire2';
import 'hammerjs';
import { environment } from '../../environments/environment';
import { AuthModule } from '../auth/auth.module';
import { DataModule } from '../data/data.module';
import { HomeModule } from '../home/home.module';
import { PublicDashboardModule } from '../public-dashboard/public-dashboard.module';
import { SettingsModule } from '../settings/settings.module';
import { SharedModule } from '../shared/shared.module';
import { SignUpModule } from '../sign-up/sign-up.module';
import { VolunteerSystemModule } from '../volunteer-system/volunteer-system.module';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { HeaderComponent } from './containers/header/header.component';
import { RootComponent } from './containers/root/root.component';
import { SidenavComponent } from './containers/sidenav/sidenav.component';
import { routes } from './root.routes';
import { rootEffects } from './store/effects';
import { rootReducers } from './store/reducers';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('/ngsw-worker.js'),
    RouterModule.forRoot(routes),
    StoreModule.forRoot(rootReducers),
    EffectsModule.forRoot(rootEffects),
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    StoreRouterConnectingModule,
    // Cerberus Modules
    AuthModule,
    DataModule,
    HomeModule,
    PublicDashboardModule,
    SettingsModule,
    SharedModule,
    SignUpModule,
    VolunteerSystemModule,
  ],
  declarations: [
    RootComponent,
    HeaderComponent,
    SidenavComponent,
  ],
  providers: [],
  bootstrap: [RootComponent],
})
export class RootModule {
}
