/**
 * Created by devon on 2017-03-27.
 */
import { Component, OnInit } from '@angular/core';
import { Camper } from "../camper";
import { CamperService } from "../camper.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";
import {AccountService} from "../account.service";

@Component({
  selector: 'camper-list',
  templateUrl: './camper-list.component.html',
  providers: [ CamperService, CookieService, AccountService ]
})

export class CamperListComponent implements OnInit {
  title: 'Home Page';
  campers: Camper[];
  camper: Camper;
  originalCampers: Camper[];
  errorMessage: any;
  userInfo: Object;
  searchQuery: string;

  constructor(private camperService: CamperService,
              private router: Router,
              private cookieService: CookieService,
              private accountService: AccountService){
  }

  search(){
    if (this.searchQuery.length === 0) {
      this.campers = this.originalCampers;
    } else {
      this.campers = [];
      for (let key = 0; key < this.originalCampers.length; key++) {
        console.log(key);
        console.log(this.originalCampers[key]);
        if (this.originalCampers[key].camperFirstName.toLowerCase().includes(this.searchQuery.toLowerCase())) {
          this.campers.push(this.originalCampers[key]);
        }
      }
      console.log(this.campers);
    }
  }

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
    if (!this.userInfo){
      this.router.navigate(['./']);
    } else {
      this.getCampers();
    }
  }

  getCampers() {
    this.camperService.getCampers()
      .subscribe(
        campers => {this.campers = campers; this.originalCampers = campers;},
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

  logout(){
    this.accountService.logOut()
      .subscribe(data => {
        if (data.status == 200){
          this.cookieService.removeAll();
          this.router.navigate(['./']);
        }
      });
  }
}
