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

import { CheckInFormComponent } from './check-in-form/check-in-form.component';
import { JumbotronComponent } from './shared/jumbotron/jumbotron.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/layout/layout.component';
import { NewUserFormComponent } from './new-user-form/new-user-form.component';
import { VisitHistoryComponent } from './visit-history/visit-history.component';

import { VolunteerService } from './shared/volunteer.service';


@NgModule({
  declarations: [
    AppComponent,
    CheckInFormComponent,
    LayoutComponent,
    NewUserFormComponent,
    VisitHistoryComponent,
    HomeComponent,
    JumbotronComponent
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
    MdListModule
  ],
  providers: [VolunteerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
