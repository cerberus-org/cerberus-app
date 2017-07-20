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
  MdListModule,
  MdTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Guard } from './guard';
import 'hammerjs';

import { JumbotronComponent } from './shared/jumbotron/jumbotron.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './login/login.component';
import { VisitHistoryComponent } from './home/visit-history/visit-history.component';
import { NewVolunteerFormComponent } from './volunteer-check-in/new-volunteer-form/new-volunteer-form.component';
import { CheckInFormComponent } from './volunteer-check-in/check-in-form/check-in-form.component';
import { VolunteerCheckInComponent } from './volunteer-check-in/volunteer-check-in.component';

import { UserService } from './services/user.service';
import { VolunteerService } from './services/volunteer.service';
import { VisitService } from './services/visit.service';
import { StoreModule } from '@ngrx/store';
import VisitReducer from './reducers/visit';
import { ToolbarComponent } from './shared/layout/toolbar/toolbar.component';
import { VolunteerMenuComponent } from './home/volunteer-menu/volunteer-menu.component';
import { FooterComponent } from './shared/layout/footer/footer.component';

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
    LoginComponent,
    ToolbarComponent,
    VolunteerMenuComponent,
    FooterComponent
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
    MdTabsModule,
    StoreModule.provideStore({ visits: VisitReducer, volunteers: VolunteerReducer })
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
