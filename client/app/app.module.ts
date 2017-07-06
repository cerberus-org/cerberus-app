import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdAutocompleteModule, MdButtonModule, MdInputModule, MdListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import 'hammerjs';

import { CheckInComponent } from './check-in/check-in.component';
import { VisitHistoryComponent } from './visit-history/visit-history.component';
import { VolunteerService } from './shared/volunteer.service';
import { LayoutComponent } from './shared/layout/layout.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    CheckInComponent,
    VisitHistoryComponent,
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdInputModule,
    MdListModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [VolunteerService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
