import { Component, OnInit } from '@angular/core';
import { CamperService } from "../camper.service";
import { Router } from "@angular/router";
import {CookieService} from "angular2-cookie/core";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-camper-active',
  templateUrl: './camper-active.component.html',
  styleUrls: ['./camper-active.component.css'],
  providers: [ CamperService, CookieService, AccountService ]
})
export class CamperActiveComponent implements OnInit {

  userInfo: Object;
  campers: Array<any>;
  errorMessage: any;
  searchQuery: string;
  originalCampers: Array<any>;

  constructor(private camperService: CamperService,
              private router: Router,
              private cookieService: CookieService,
              private accountService: AccountService) { }

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
    if (!this.userInfo){
      this.router.navigate(['./']);
    } else {
      this.getActiveCampers();
    }
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

  getActiveCampers() {
    this.camperService.getActiveCampers()
      .subscribe(
        campers => {this.campers = campers; this.originalCampers = campers;},
        error =>  this.errorMessage = <any>error);
  }

  deleteCamper(_id) {
    if (confirm('Are you sure you want to delete this camper?')) {
      this.camperService.deleteCamper(_id).
      subscribe(response => {
        this.getActiveCampers();
        this.router.navigate(['./camper-active']);
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
