/**
 * Created by devon on 2017-03-27.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import child components
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { CamperDetailsComponent } from './camper-details/camper-details.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CamperRegisterComponent } from './camper-register/camper-register.component';
import {CamperEditComponent} from "./camper-edit/camper-edit.component";

const appRoutes: Routes = [
  // add component pathing
  { path: 'home', component: SignInComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'camper-details/:id', component: CamperDetailsComponent },
  { path: 'camper-edit/:id', component: CamperEditComponent },
  { path: 'camper-list', component: HomeComponent },
  { path: 'camper-register', component: CamperRegisterComponent },
  // default redirect
  { path: '', component: SignInComponent, pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
