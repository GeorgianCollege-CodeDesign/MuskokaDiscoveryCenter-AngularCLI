/**
 * Created by devon on 2017-03-27.
 */
import { Component } from '@angular/core';
import { Camper } from "../camper";
import { CamperService } from "../camper.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})

export class HomeComponent {
  title: 'Home Page';
  campers: Camper[];
  camper: Camper;
  errorMessage: any;

  constructor(private camperService: CamperService){
    this.getCampers();
  }

  getCampers() {
    this.camperService.getCampers()
      .subscribe(
        campers => this.campers = campers,
        error =>  this.errorMessage = <any>error);
    console.log(this.campers);
  }
  getCamper(id: number){
    this.camperService.getCamper(id)
      .subscribe(
        camper => this.camper = camper,
        error =>  this.errorMessage = <any>error);
  }
}
