import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { routing } from './app.routing';
import { CamperDetailsComponent } from './camper-details/camper-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CamperRegisterComponent } from './camper-register/camper-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LogInComponent,
    CamperDetailsComponent,
    SignInComponent,
    CamperRegisterComponent
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
