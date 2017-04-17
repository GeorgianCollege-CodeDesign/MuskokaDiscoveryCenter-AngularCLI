/**
 * Created by devon on 2017-03-27.
 */
import { Component, OnInit } from '@angular/core';
import { Camper } from "../camper";
import { CamperService } from "../camper.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'camper-list',
  templateUrl: './camper-list.component.html',
  providers: [ CamperService, CookieService ]
})

export class CamperListComponent implements OnInit {
  title: 'Home Page';
  campers: Camper[];
  camper: Camper;
  errorMessage: any;
  userInfo: Object;

  constructor(private camperService: CamperService,
              private router: Router,
              private cookieService: CookieService){
  }

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
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
        this.router.navigate(['./camper-list']);
      });
    }
  }
}
