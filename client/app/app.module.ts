import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MdAutocompleteModule, MdButtonModule, MdCardModule, MdInputModule, MdListModule, MdPaginatorModule, MdTableModule,
  MdTabsModule, MdToolbarModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { ChartsModule } from 'ng2-charts';
import { Guard } from './guard';
import { SignaturePadModule } from 'angular2-signaturepad';
import 'hammerjs';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { VolunteerMenuComponent } from './home/volunteer-menu/volunteer-menu.component';
import { VolunteerCheckInComponent } from './volunteer-check-in/volunteer-check-in.component';
import { CheckInFormComponent } from './volunteer-check-in/check-in-form/check-in-form.component';
import { SignatureFieldComponent } from './signature-field/signature-field.component';
import { NewVolunteerFormComponent } from './volunteer-check-in/new-volunteer-form/new-volunteer-form.component';
import { VisitDataDisplayComponent } from './visit-data-display/visit-data-display.component';
import { VisitHistoryTableComponent } from './visit-data-display/visit-history-table/visit-history-table.component';
import { DailyHoursChartComponent } from './visit-data-display/daily-hours-chart/daily-hours-chart.component';

import { UserService } from './services/user.service';
import { VolunteerService } from './services/volunteer.service';
import { VisitService } from './services/visit.service';

import { visitReducer } from './reducers/visit';
import { volunteerReducer } from './reducers/volunteer';

@NgModule({
  declarations: [
    AppComponent,
    CheckInFormComponent,
    LayoutComponent,
    NewVolunteerFormComponent,
    VisitHistoryTableComponent,
    HomeComponent,
    VolunteerCheckInComponent,
    LoginComponent,
    HeaderComponent,
    VolunteerMenuComponent,
    FooterComponent,
    VisitDataDisplayComponent,
    DailyHoursChartComponent,
    SignatureFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdPaginatorModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    CdkTableModule,
    ChartsModule,
    SignaturePadModule,
    StoreModule.provideStore({ visits: visitReducer, volunteers: volunteerReducer })
  ],
  providers: [
    Guard,
    UserService,
    VisitService,
    VolunteerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
