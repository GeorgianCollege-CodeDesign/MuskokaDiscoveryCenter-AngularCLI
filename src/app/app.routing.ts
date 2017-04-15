/**
 * Created by devon on 2017-03-27.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import child components
import { CamperListComponent } from './camper-list/camper-list.component';
import { LogInComponent } from './log-in/log-in.component';
import { CamperDetailsComponent } from './camper-details/camper-details.component';
import { HomeComponent } from './home/home.component';
import { CamperRegisterComponent } from './camper-register/camper-register.component';
import { CamperEditComponent } from "./camper-edit/camper-edit.component";

const appRoutes: Routes = [
  // add component pathing
  { path: 'camper-list', component: CamperListComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'camper-details/:id', component: CamperDetailsComponent },
  { path: 'camper-edit/:id', component: CamperEditComponent },
  { path: 'camper-register', component: CamperRegisterComponent },
  // default redirect
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
