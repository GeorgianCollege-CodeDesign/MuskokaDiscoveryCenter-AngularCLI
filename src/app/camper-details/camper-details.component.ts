import { Component, OnInit } from '@angular/core';
import { CamperService } from '../camper.service';
import { CookieService } from "angular2-cookie/core";
import { AccountService } from "../account.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-camper-details',
  templateUrl: './camper-details.component.html',
  styleUrls: ['./camper-details.component.css'],
  providers: [ CamperService, CookieService, AccountService, Location, {provide: LocationStrategy, useClass: PathLocationStrategy}]
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
  startDate: string;
  endDate: string;
  absenceDays: Array<any>;
  isActive: Boolean;
  pickupHistory: Array<any>;

  constructor(private camperService: CamperService,
              private cookieService: CookieService,
              private router: Router,
              private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private _location: Location) {  }

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
    if (!this.userInfo){
      this.router.navigate(['./']);
    } else {
      this.activatedRoute.params.subscribe((params: Params) => {
        let camperID = params['id'];
        console.log(camperID);
        this._id = camperID;
        this.camperService.getCamper(camperID)
          .subscribe(res => {

            let tempStart = new Date(res.startDate);
            let tempEnd = new Date(res.endDate);

            this.camperFirstName = res.camperFirstName;
            this.camperLastName = res.camperLastName;
            this.parentFirstName = res.parentFirstName ;
            this.parentLastName = res.parentLastName;
            this.parentPhoneNumber = res.parentPhoneNumber;
            this.paymentDays = res.paymentDays;
            this.camperAge = res.camperAge;
            this.camperNotes = res.camperNotes;
            this.camperPickupList = res.camperPickupList;
            this.startDate = this.ISOtoYYYYMMDD(tempStart);
            this.endDate = this.ISOtoYYYYMMDD(tempEnd);
            this.absenceDays = res.absenceDays;
            this.isActive  = res.isActive;
          });
      });
    }
  }
  ISOtoYYYYMMDD(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let dt = date.getDate();
    let tempDt;
    let tempMonth;

    if (dt < 10) {
      tempDt = '0' + dt;
    }
    else{
      tempDt = dt.toLocaleString();
    }
    if (month < 10) {
      tempMonth = '0' + month;
    }else {
      tempMonth = month.toLocaleString()
    }
    console.log(year+'-' + tempMonth + '-'+tempDt);
    return (year+'-' + tempMonth + '-'+tempDt);
  }

  goBack(){
    this._location.back();
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
