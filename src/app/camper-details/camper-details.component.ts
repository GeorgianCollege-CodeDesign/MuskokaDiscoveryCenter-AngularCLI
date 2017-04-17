import { Component, OnInit } from '@angular/core';
import { CamperService } from '../camper.service';
import {CookieService} from "angular2-cookie/core";
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-camper-details',
  templateUrl: './camper-details.component.html',
  styleUrls: ['./camper-details.component.css'],
  providers: [ CamperService, CookieService, AccountService ]
})

export class CamperDetailsComponent implements OnInit {
  userInfo: Object;
  campers: Array<any>;
  _id: String;
  camperFirstName: String;
  camperLastName: String;
  parentFirstName: String;
  parentLastName: String;
  parentPhoneNumber: String;
  paymentDays: Number;
  camperAge: Number;
  camperNotes: String;
  camperPickupList: Array<any>;
  startDate: Date;
  endDate: Date;
  absenceDays: Array<any>;
  isActive: Boolean;
  pickupHistory: Array<any>;

  constructor(private camperService: CamperService,
              private cookieService: CookieService,
              private router: Router,
              private accountService: AccountService) {  }
  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
    if (!this.userInfo){
      this.router.navigate(['./']);
    } else {
      this.getCampers();
    }

  }

  // get campers
  getCampers() {
    this.camperService.getCampers().subscribe(response => {this.campers = response});
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
