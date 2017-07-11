import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdAutocompleteModule, MdButtonModule, MdCardModule, MdInputModule, MdListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

import { JumbotronComponent } from './shared/jumbotron/jumbotron.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { VisitHistoryComponent } from './visit-history/visit-history.component';
import { NewVolunteerFormComponent } from './volunteer-check-in/new-volunteer-form/new-volunteer-form.component';
import { CheckInFormComponent } from './volunteer-check-in/check-in-form/check-in-form.component';
import { VolunteerCheckInComponent } from './volunteer-check-in/volunteer-check-in.component';

import { VolunteerService } from './shared/volunteer.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './shared/login.service';
import { Guard } from './guard';

@NgModule({
  declarations: [
    AppComponent,
    CheckInFormComponent,
    LayoutComponent,
    NewVolunteerFormComponent,
    VisitHistoryComponent,
    HomeComponent,
    JumbotronComponent,
    VolunteerCheckInComponent,
    LoginComponent
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
  ],
  providers: [VolunteerService, LoginService, Guard],
  bootstrap: [AppComponent]
})
export class AppModule {
}
