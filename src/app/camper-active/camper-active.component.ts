import { Component, OnInit } from '@angular/core';
import { CamperService } from "../camper.service";
import { Router } from "@angular/router";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-camper-active',
  templateUrl: './camper-active.component.html',
  styleUrls: ['./camper-active.component.css'],
  providers: [ CamperService, CookieService ]
})
export class CamperActiveComponent implements OnInit {

  userInfo: Object;
  campers: Array<any>;
  errorMessage: any;

  constructor(private camperService: CamperService,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
    this.getActiveCampers();
  }

  getActiveCampers() {
    this.camperService.getActiveCampers()
      .subscribe(
        campers => this.campers = campers,
        error =>  this.errorMessage = <any>error);
  }

  deleteCamper(_id) {
    if (confirm('Are you sure you want to delete this camper?')) {
      this.camperService.deleteCamper(_id).
      subscribe(response => {
        this.getActiveCampers();
        this.router.navigate(['./camper-active']);
      });
    }
  }
}
