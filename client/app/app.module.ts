import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatListModule,
  MatPaginatorModule, MatRadioModule, MatSnackBarModule, MatTableModule, MatTabsModule, MatToolbarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { VisitHistoryTableComponent } from './components/data-display/visit-history-table/visit-history-table.component';
import { DailyHoursChartComponent } from './components/data-display/daily-hours-chart/daily-hours-chart.component';

import { CheckInComponent } from './components/check-in/check-in.component';
import { CheckInFormComponent } from './components/check-in/check-in-form/check-in-form.component';
import { SignatureFieldComponent } from './components/check-in/check-in-form/signature-field/signature-field.component';
import { NewVolunteerFormComponent } from './components/check-in/new-volunteer-form/new-volunteer-form.component';

import { ErrorService } from './services/error.service';
import { SiteService } from './services/site.service';
import { OrganizationService } from './services/organization.service';
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
    LayoutComponent,
    LoginComponent,
    NewOrganizationFormComponent,
    NewUserFormComponent,
    NewVolunteerFormComponent,
    OrganizationConfirmComponent,
    OrganizationDashboardComponent,
    SideMarginsComponent,
    SignatureFieldComponent,
    VisitHistoryTableComponent,
    VolunteerMenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    ChartsModule,
    EffectsModule.forRoot([
      CheckInEffects,
      DataDisplayEffects,
      GettingStartedEffects,
      LoginEffects
    ]),
    FlexLayoutModule,
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
    StoreModule.forRoot(reducers)
  ],
  providers: [,
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
