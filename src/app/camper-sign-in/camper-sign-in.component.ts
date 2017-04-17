import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { CamperService } from "../camper.service";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-camper-sign-in',
  templateUrl: './camper-sign-in.component.html',
  styleUrls: ['./camper-sign-in.component.css'],
  providers: [ CamperService, CookieService ]
})
export class CamperSignInComponent implements OnInit {

  _id: string;
  camperPickupList: Array<any>;
  selectedValue: string;
  userInfo: Object;

  constructor(private activatedRoute: ActivatedRoute,
              private camperService: CamperService,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
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

  signIn(){
    this.camperService.camperSignIn(this.selectedValue, this._id)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['./']);
      })
  }

}
