import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdInputModule,
  MdListModule, MdPaginatorModule,
  MdTableModule,
  MdTabsModule,
  MdToolbarModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { Guard } from './guard';
import 'hammerjs';

import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { VisitHistoryComponent } from './visit-data-display/visit-history/visit-history.component';
import { NewVolunteerFormComponent } from './volunteer-check-in/new-volunteer-form/new-volunteer-form.component';
import { CheckInFormComponent } from './volunteer-check-in/check-in-form/check-in-form.component';
import { VolunteerCheckInComponent } from './volunteer-check-in/volunteer-check-in.component';

import { UserService } from './services/user.service';
import { VolunteerService } from './services/volunteer.service';
import { VisitService } from './services/visit.service';
import { StoreModule } from '@ngrx/store';
import { HeaderComponent } from './shared/layout/header/header.component';
import { VolunteerMenuComponent } from './home/volunteer-menu/volunteer-menu.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { VisitDataDisplayComponent } from './visit-data-display/visit-data-display.component';
import { SignatureFieldComponent } from './signature-field/signature-field.component';

import { visitReducer } from './reducers/visit';
import { volunteerReducer } from './reducers/volunteer';
import { CdkTableModule } from '@angular/cdk';


@NgModule({
  declarations: [
    AppComponent,
    CheckInFormComponent,
    LayoutComponent,
    NewVolunteerFormComponent,
    VisitHistoryComponent,
    HomeComponent,
    VolunteerCheckInComponent,
    LoginComponent,
    HeaderComponent,
    VolunteerMenuComponent,
    FooterComponent,
    VisitDataDisplayComponent,
    SignatureFieldComponent,
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
    StoreModule.provideStore({ visits: visitReducer, volunteers: volunteerReducer }),
    SignaturePadModule,
    SignaturePadModule,
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
