import { Component, OnInit } from '@angular/core';
import { CamperService } from '../camper.service';


@Component({
  selector: 'app-camper-register',
  templateUrl: './camper-register.component.html',
  styleUrls: ['./camper-register.component.css']
})

export class CamperRegisterComponent implements OnInit {
  campers: Array<any>;
  _id: String;
  camperFirstName: String;
  camperLastName: String;
  parentFirstName: String;
  parentLastName: String;
  parentPhoneNumber: String;
  paymentDays: Number;
  camperAge: Number;
  startDate: Number;
  endDate: Number;
  camperNotes: String;
  camperPickupList: Array<any>;

  constructor(private camperService: CamperService) {
    this.getCampers();
  };

  // get camper
  getCampers() {
    this.camperService.getCampers().subscribe(response => {this.campers = response});
  }

  // clear form
  clearForm() {
    this._id = null;
    this.camperFirstName = null;
    this.camperLastName = null;
    this.parentFirstName = null;
    this.parentLastName = null;
    this.parentPhoneNumber = null;
    this.paymentDays = null;
    this.camperAge = null;
    this.camperNotes = null;
    this.camperPickupList = null;
  }

  ngOnInit() {
  }

}
