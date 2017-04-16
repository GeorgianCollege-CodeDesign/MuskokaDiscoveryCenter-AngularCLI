import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import { CamperService } from "../camper.service";

@Component({
  selector: 'app-camper-sign-in',
  templateUrl: './camper-sign-in.component.html',
  styleUrls: ['./camper-sign-in.component.css'],
  providers: [ CamperService ]
})
export class CamperSignInComponent implements OnInit {

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

  signIn(){
    this.camperService.camperSignIn(this.selectedValue, this._id)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['./']);
      })
  }

}
