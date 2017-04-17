import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CamperService} from "../camper.service";
import {Camper} from "../camper";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-camper-edit',
  templateUrl: './camper-edit.component.html',
  styleUrls: ['./camper-edit.component.css'],
  providers: [ CamperService, CookieService]
})

export class CamperEditComponent implements OnInit {

  userInfo: Object;
  _id: string = '';
  camperFirstName: string = '';
  camperLastName: string= '';
  parentFirstName: string = '';
  parentLastName: string = '';
  parentPhoneNumber: string = '';
  paymentDays: number = 3;
  camperAge: number = 3;
  camperNotes: string = '';
  camperPickupList: Array<any>;
  startDate: string;
  endDate: string;
  absenceDays: Array<any> = [];
  isActive: boolean;

  pickupHistory: Array<any>;  constructor(
    private activatedRoute: ActivatedRoute,
    private camperService: CamperService,
    private router: Router,
    private cookieService: CookieService) { }

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
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

  updateCamper(){
    let tempStart = new Date(this.startDate+'T20:00:00');
    let tempEnd = new Date(this.endDate+'T20:00:00');
    console.log(tempStart);
    console.log(tempEnd);
    let camper: Camper = {
      _id: this._id,
      camperFirstName: this.camperFirstName,
      camperLastName: this.camperLastName,
      parentFirstName: this.parentFirstName,
      parentLastName: this.parentLastName,
      parentPhoneNumber : this.parentPhoneNumber,
      paymentDays: this.paymentDays,
      camperAge: this.camperAge,
      camperNotes : this.camperNotes,
      camperPickupList : this.camperPickupList,
      startDate: tempStart.getTime(),
      endDate: tempEnd.getTime(),
      absenceDays: this.absenceDays,
      isActive: this.isActive,
      pickupHistory: this.pickupHistory
    };

    this.camperService.putCamper(camper, this._id)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['./camper-list']);
      })
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

}
