import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule, MatPaginatorModule, MatRadioModule,
  MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ChartsModule } from 'ng2-charts';
import { SignaturePadModule } from 'angular2-signaturepad';
import 'hammerjs';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { Guard } from './guard';

import { AppComponent } from './app.component';

import { CheckInComponent } from './containers/check-in/check-in.component';
import { GettingStartedComponent } from './containers/getting-started/getting-started.component';
import { LoginComponent } from './containers/login/login.component';
import { OrganizationDashboardComponent } from './containers/organization-dashboard/organization-dashboard.component';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { CheckInFormComponent } from './components/check-in-form/check-in-form.component';
import { DailyHoursChartComponent } from './components/daily-hours-chart/daily-hours-chart.component';
import { DataDisplayComponent } from './containers/data-display/data-display.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NewOrganizationFormComponent } from './components/new-organization-form/new-organization-form.component';
import { NewUserFormComponent } from './components/new-user-form/new-user-form.component';
import { NewVolunteerFormComponent } from './components/new-volunteer-form/new-volunteer-form.component';
import { OrganizationConfirmComponent } from './components/organization-confirm/organization-confirm.component';
import { SignatureFieldComponent } from './components/check-in-form/signature-field/signature-field.component';
import { VolunteerMenuComponent } from './components/volunteer-menu/volunteer-menu.component';
import { VisitHistoryTableComponent } from './components/visit-history-table/visit-history-table.component';

import { AuthService } from './services/auth.service';
import { ErrorService } from './services/error.service';
import { SiteService } from './services/site.service';
import { OrganizationService } from './services/organization.service';
import { RouterEffects } from './effects/router.effects';
import { SnackBarService } from './services/snack-bar.service';
import { VisitService } from './services/visit.service';
import { VolunteerService } from './services/volunteer.service';
import { UserService } from './services/user.service';

import { reducers } from './reducers/index';
import { CheckInEffects } from './effects/check-in.effects';
import { DataDisplayEffects } from './effects/data-display.effects';
import { GettingStartedEffects } from './effects/getting-started.effects';
import { LoginEffects } from './effects/login.effects';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    CheckInComponent,
    CheckInFormComponent,
    DailyHoursChartComponent,
    DataDisplayComponent,
    FooterComponent,
    GettingStartedComponent,
    HeaderComponent,
    LoginComponent,
    NewOrganizationFormComponent,
    NewUserFormComponent,
    NewVolunteerFormComponent,
    OrganizationConfirmComponent,
    OrganizationDashboardComponent,
    SignatureFieldComponent,
    VisitHistoryTableComponent,
    VolunteerMenuComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    ChartsModule,
    EffectsModule.forRoot([
      CheckInEffects,
      DataDisplayEffects,
      GettingStartedEffects,
      LoginEffects,
      RouterEffects
    ]),
    HttpModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SignaturePadModule,
    StoreModule.forRoot(reducers),
    StoreRouterConnectingModule
  ],
  providers: [
    AuthService,
    ErrorService,
    Guard,
    OrganizationService,
    SiteService,
    SnackBarService,
    UserService,
    VisitService,
    VolunteerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
