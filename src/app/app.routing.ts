/**
 * Created by devon on 2017-03-27.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import child components
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  // add component pathing
  { path: 'home', component: HomeComponent },
  // default redirect
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
