import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CamperListComponent } from './camper-list/camper-list.component';
import { LogInComponent } from './log-in/log-in.component';
import { routing } from './app.routing';
import { CamperDetailsComponent } from './camper-details/camper-details.component';
import { HomeComponent } from './home/home.component';
import { CamperRegisterComponent } from './camper-register/camper-register.component';
import { CamperEditComponent } from './camper-edit/camper-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CamperListComponent,
    LogInComponent,
    CamperDetailsComponent,
    HomeComponent,
    CamperRegisterComponent,
    CamperEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
