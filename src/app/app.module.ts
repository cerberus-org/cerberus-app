import { CdkTableModule } from '@angular/cdk/table';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule, MatListModule, MatNativeDateModule,
  MatPaginatorModule,
  MatRadioModule, MatSidenavModule, MatSlideToggleModule, MatSnackBarModule, MatTableModule, MatTabsModule,
  MatToolbarModule
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
import { ChartsModule } from 'ng2-charts';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { LoginGuard } from './login-guard';

import { AppComponent } from './app.component';

import { CheckInComponent } from './containers/check-in/check-in.component';
import { DataDisplayComponent } from './containers/data-display/data-display.component';
import { GettingStartedComponent } from './containers/getting-started/getting-started.component';
import { LoginComponent } from './containers/login/login.component';
import { OrganizationDashboardComponent } from './containers/organization-dashboard/organization-dashboard.component';
import { SettingsPageComponent } from './containers/settings-page/settings-page.component';
import { VerificationDialogComponent } from './containers/verification-dialog/verification-dialog.component';

import { AboutUsComponent } from './components/about-us/about-us.component';
import { CheckInFormComponent } from './components/check-in-form/check-in-form.component';
import { SignatureFieldComponent } from './components/check-in-form/signature-field/signature-field.component';
import { DailyHoursChartComponent } from './components/daily-hours-chart/daily-hours-chart.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NewVolunteerFormComponent } from './components/new-volunteer-form/new-volunteer-form.component';
import { OrganizationConfirmComponent } from './components/organization-confirm/organization-confirm.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { VolunteerMenuComponent } from './components/volunteer-menu/volunteer-menu.component';

import { AuthService } from './services/auth.service';
import { ErrorService } from './services/error.service';
import { OrganizationService } from './services/organization.service';
import { SiteService } from './services/site.service';
import { SnackBarService } from './services/snack-bar.service';
import { UserService } from './services/user.service';
import { VisitService } from './services/visit.service';
import { VolunteerService } from './services/volunteer.service';

import { OrganizationFormComponent } from './components/organization-form/organization-form.component';
import { ReportsFormComponent } from './components/reports-form/reports-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CsvService } from './services/csv.service';
import { AppEffects } from './effects/app.effects';
import { CheckInEffects } from './effects/check-in.effects';
import { DataDisplayEffects } from './effects/data-display.effects';
import { GettingStartedEffects } from './effects/getting-started.effects';
import { LoginEffects } from './effects/login.effects';
import { RouterEffects } from './effects/router.effects';
import { SettingsEffects } from './effects/settings.effects';
import { reducers } from './reducers/index';
import { VerificationGuard } from './verification-guard';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    CheckInComponent,
    CheckInFormComponent,
    DailyHoursChartComponent,
    DataDisplayComponent,
    DataTableComponent,
    FooterComponent,
    GettingStartedComponent,
    HeaderComponent,
    LoginComponent,
    OrganizationFormComponent,
    UserFormComponent,
    NewVolunteerFormComponent,
    OrganizationConfirmComponent,
    OrganizationDashboardComponent,
    SettingsPageComponent,
    SignatureFieldComponent,
    VolunteerMenuComponent,
    VerificationDialogComponent,
    SidenavComponent,
    ReportsFormComponent
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
      SettingsEffects,
      AppEffects,
      RouterEffects
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
    MatPaginatorModule,
    MatRadioModule,
    MatSidenavModule,
    MatSlideToggleModule,
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
  entryComponents: [VerificationDialogComponent]
})
export class AppModule {
}
