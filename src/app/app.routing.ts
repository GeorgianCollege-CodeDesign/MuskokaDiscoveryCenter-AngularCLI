/**
 * Created by devon on 2017-03-27.
 */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import child components

const appRoutes: Routes = [
  // add component pathing
  { path: 'home', component: componentName }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
