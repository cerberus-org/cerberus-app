import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
// volunteer service
import { HttpModule } from '@angular/http';
// angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MaterialModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckInComponent } from './check-in/check-in.component';
import { VisitHistoryComponent } from './visit-history/visit-history.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    CheckInComponent,
    VisitHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // volunteer service
    HttpModule,
    // angular material
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
