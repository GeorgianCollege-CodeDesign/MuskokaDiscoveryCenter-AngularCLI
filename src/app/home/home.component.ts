/**
 * Created by devon on 2017-03-27.
 */
import { Component, OnInit } from '@angular/core';
import { Camper } from "../camper";
import { CamperService } from "../camper.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers: [ CamperService ]
})

export class HomeComponent implements OnInit {
  title: 'Home Page';
  campers: Camper[];
  camper: Camper;
  errorMessage: any;

  constructor(private camperService: CamperService){
  }

  ngOnInit() {
    // Load comments
    this.getCampers();
  }

  getCampers() {
    this.camperService.getCampers()
      .subscribe(
        campers => this.campers = campers,
        error =>  this.errorMessage = <any>error);
  }

  getCamper(id: number) {
    this.camperService.getCamper(id)
      .subscribe(
        camper => this.camper = camper,
        error =>  this.errorMessage = <any>error);
  }

  deleteCamper(_id) {
    if (confirm('Are you sure you want to delete this camper?')) {
      this.camperService.deleteCamper(_id).
      subscribe(response => {
        this.getCampers();
      });
    }
  }
}
