import { Component, OnInit } from '@angular/core';
import { CamperService } from '../camper.service';
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";


@Component({
  selector: 'app-camper-register',
  templateUrl: './camper-register.component.html',
  styleUrls: ['./camper-register.component.css'],
  providers: [ CamperService, CookieService ]
})

export class CamperRegisterComponent implements OnInit {
  userInfo: Object;
  campers: Array<any>;
  camperFirstName: String;
  camperLastName: String;
  parentFirstName: String;
  parentLastName: String;
  parentPhoneNumber: String;
  paymentDays: Number;
  camperAge: Number;
  startDate: Date;
  endDate: Date;
  camperNotes: String;
  camperPickupList: Array<any>;

  constructor(private camperService: CamperService,
              private router: Router,
              private cookieService: CookieService) {
  };

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
  }


  // get camper
  getCampers() {
    this.camperService.getCampers().subscribe(response => {this.campers = response});
  }


  addCamper(){
    console.log(this.startDate);
    console.log(new Date(this.startDate));
    //this.paymentDays = this.getBusinessDatesCount(new Date(this.startDate), new Date(this.endDate));
    let tempStart = new Date(`${this.startDate}T04:00:01`);
    let tempEnd = new Date(`${this.endDate}T04:00:01`);

    let newCamper = {
      camperFirstName: this.camperFirstName,
      camperLastName: this.camperLastName,
      parentFirstName: this.parentFirstName,
      parentLastName: this.parentLastName,
      parentPhoneNumber: this.parentPhoneNumber,
      paymentDays: this.paymentDays,
      camperAge: this.camperAge,
      camperNotes: this.camperNotes,
      camperPickupList: this.camperPickupList,
      startDate: tempStart.getTime(),
      endDate: tempEnd.getTime()
    };
    this.camperService.createCamper(newCamper)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['./camper-list']);
      });
  }

  // clear form
  clearForm() {
    this.camperFirstName = null;
    this.camperLastName = null;
    this.parentFirstName = null;
    this.parentLastName = null;
    this.parentPhoneNumber = null;
    this.paymentDays = null;
    this.camperAge = null;
    this.camperNotes = null;
    this.camperPickupList = null;
    this.startDate = null;
    this.endDate = null;
  }

  getBusinessDatesCount(startDate: Date, endDate: Date) {
    let count = 0;
    let curDate = startDate;
    while (curDate <= endDate) {
      let dayOfWeek = curDate.getDay();
      if(!((dayOfWeek == 6) || (dayOfWeek == 0)))
        count++;
      curDate.setDate(curDate.getDate() + 1);
    }
    return count;
  }


}
