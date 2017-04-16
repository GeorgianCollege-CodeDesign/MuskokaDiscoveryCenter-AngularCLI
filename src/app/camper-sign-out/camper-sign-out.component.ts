import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {CamperService} from "../camper.service";

@Component({
  selector: 'app-signout-form',
  templateUrl: './camper-sign-out.component.html',
  styleUrls: ['./camper-sign-out.component.css'],
  providers: [ CamperService ]
})
export class CamperSignOutComponent implements OnInit {
  _id: string;
  camperPickupList: Array<any>;
  selectedValue: string;

  constructor(private activatedRoute: ActivatedRoute,
              private camperService: CamperService,
              private router: Router) { }

  ngOnInit() {
    this.getCamper();
  }

  getCamper(){
    this.activatedRoute.params.subscribe((params: Params) => {
      let camperID = params['id'];
      console.log(camperID);
      this._id = camperID;
      this.camperService.getCamper(camperID)
        .subscribe(res => {
          this.camperPickupList = res.camperPickupList;
        });
    });
  }

  signOut(){
    this.camperService.camperSignOut(this.selectedValue, this._id)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['./']);
      })
  }

}
