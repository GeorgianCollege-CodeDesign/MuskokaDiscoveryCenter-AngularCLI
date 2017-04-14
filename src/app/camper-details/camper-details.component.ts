import { Component, OnInit } from '@angular/core';
import { CamperService } from '../camper.service';

@Component({
  selector: 'app-camper-details',
  templateUrl: './camper-details.component.html',
  styleUrls: ['./camper-details.component.css'],
  providers: [ CamperService ]
})

export class CamperDetailsComponent implements OnInit {
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

  constructor(private camperService: CamperService) {
    this.getCampers();
  };

  // get campers
  getCampers() {
    this.camperService.getCampers().subscribe(response => {this.campers = response});
  }

  ngOnInit() {
  }

}
