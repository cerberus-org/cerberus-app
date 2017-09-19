import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MdAutocompleteModule, MdButtonModule, MdCardModule, MdIconModule, MdInputModule, MdListModule, MdPaginatorModule,
  MdRadioModule, MdSnackBarModule, MdTableModule, MdTabsModule, MdToolbarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { SignaturePadModule } from 'angular2-signaturepad';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';
import { Guard } from './guard';

import { AppComponent } from './app.component';

import { LayoutComponent } from './components/shared/layout/layout.component';
import { HeaderComponent } from './components/shared/layout/header/header.component';
import { FooterComponent } from './components/shared/layout/footer/footer.component';
import { SideMarginsComponent } from './components/shared/side-margins/side-margins.component';

import { LoginComponent } from './components/login/login.component';

import { GettingStartedComponent } from './components/getting-started/getting-started.component';
import { AboutUsComponent } from './components/getting-started/about-us/about-us.component';
import { NewOrganizationFormComponent } from './components/getting-started/new-organization-form/new-organization-form.component';
import { NewUserFormComponent } from './components/getting-started/new-user-form/new-user-form.component';
import { OrganizationConfirmComponent } from './components/getting-started/organization-confirm/organization-confirm.component';

import { OrganizationDashboardComponent } from './components/organization-dashboard/organization-dashboard.component';
import { VolunteerMenuComponent } from './components/organization-dashboard/volunteer-menu/volunteer-menu.component';

import { VisitDataDisplayComponent } from './components/visit-data-display/visit-data-display.component';
import { VisitHistoryTableComponent } from './components/visit-data-display/visit-history-table/visit-history-table.component';
import { DailyHoursChartComponent } from './components/visit-data-display/daily-hours-chart/daily-hours-chart.component';

import { VolunteerCheckInComponent } from './components/volunteer-check-in/volunteer-check-in.component';
import { CheckInFormComponent } from './components/volunteer-check-in/check-in-form/check-in-form.component';
import { SignatureFieldComponent } from './components/volunteer-check-in/check-in-form/signature-field/signature-field.component';
import { NewVolunteerFormComponent } from './components/volunteer-check-in/new-volunteer-form/new-volunteer-form.component';

import { OrganizationService } from './services/organization.service';
import { UserService } from './services/user.service';
import { VisitService } from './services/visit.service';
import { VolunteerService } from './services/volunteer.service';
import { ErrorService } from './services/error.service';

import { locationReducer } from './reducers/location';
import { visitReducer } from './reducers/visit';
import { volunteerReducer } from './reducers/volunteer';
import { LocationService } from './services/location.service';

@NgModule({
  declarations: [
    AboutUsComponent,
    AppComponent,
    CheckInFormComponent,
    DailyHoursChartComponent,
    FooterComponent,
    GettingStartedComponent,
    HeaderComponent,
    LayoutComponent,
    LoginComponent,
    NewOrganizationFormComponent,
    NewUserFormComponent,
    NewVolunteerFormComponent,
    OrganizationConfirmComponent,
    OrganizationDashboardComponent,
    SideMarginsComponent,
    SignatureFieldComponent,
    VisitDataDisplayComponent,
    VisitHistoryTableComponent,
    VolunteerCheckInComponent,
    VolunteerMenuComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    ChartsModule,
    FlexLayoutModule,
    HttpModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdPaginatorModule,
    MdRadioModule,
    MdSnackBarModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    ReactiveFormsModule,
    SignaturePadModule,
    StoreModule.provideStore({
      locations: locationReducer,
      visits: visitReducer,
      volunteers: volunteerReducer
    })
  ],
  providers: [
    Guard,
    LocationService,
    OrganizationService,
    UserService,
    VisitService,
    VolunteerService,
    ErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
