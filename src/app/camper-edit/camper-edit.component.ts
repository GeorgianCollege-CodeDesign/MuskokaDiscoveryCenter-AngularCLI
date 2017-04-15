import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CamperService} from "../camper.service";
import {Camper} from "../camper";

@Component({
  selector: 'app-camper-edit',
  templateUrl: './camper-edit.component.html',
  styleUrls: ['./camper-edit.component.css']
})

export class CamperEditComponent implements OnInit {

  _id: string = '';
  camperFirstName: string = '';
  camperLastName: string= '';
  parentFirstName: string = '';
  parentLastName: string = '';
  parentPhoneNumber : string = '';
  paymentDays: number = 3;
  camperAge: number = 3;
  camperNotes : string = '';
  camperPickupList : Array<any> = [];
  startDate: number = 3;
  endDate: number = 3;
  absenceDays: Array<any> = [];
  isActive: boolean;

  pickupHistory: Array<any>;  constructor(
    private activatedRoute: ActivatedRoute,
    private camperService: CamperService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let camperID = params['id'];
      console.log(camperID);
      this._id = camperID;
      this.camperService.getCamper(camperID)
        .subscribe(res => {
          this.camperFirstName = res.camperFirstName;
          this.camperLastName = res.camperLastName;
          this.parentFirstName = res.parentFirstName ;
          this.parentLastName = res.parentLastName;
          this.parentPhoneNumber = res.parentPhoneNumber;
          this.paymentDays = res.paymentDays;
          this.camperAge = res.camperAge;
          this.camperNotes = res.camperNotes;
          this.camperPickupList = res.camperPickupList;
          this.startDate = res.startDate;
          this.endDate = res.endDate;
          this.absenceDays = res.absenceDays;
          this.isActive  = res.isActive;
        });
    });
  }

  updateCamper(){
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
      startDate: this.startDate,
      endDate: this.endDate,
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


}
