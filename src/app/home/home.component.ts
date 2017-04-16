import { Component, OnInit } from '@angular/core';
import {CamperService} from "../camper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  camperSignInList: Array<any>;
  camperSignOutList: Array<any>;

  constructor(private camperService: CamperService,
              private router: Router) { }

  ngOnInit() {
    this.camperSignInList = null;
    this.camperSignOutList = null;
  }

  getSignInList(){
    this.camperService.getActiveCampers()
      .subscribe(data => {
        if (data.status === 200){
          this.camperSignInList = data;
          console.log(this.camperSignInList);
          this.camperSignOutList = null;
        } else {
          this.camperSignInList = null;
          this.camperSignOutList = null;
        }
      });
  }

  camperSignIn(_id: string){
    this.router.navigate([`/camper-sign-in/${_id}`]);
  }

  getSignOutList(){
    this.camperService.getDailyCampers()
      .subscribe(data => {
        if (data.status === 200){
          this.camperSignOutList = data[0].camper;
          console.log(data);
          this.camperSignInList = null;
        } else {
          this.camperSignInList = null;
          this.camperSignOutList = null;
        }
      });
  }

  camperSignOut(_id: string) {
    this.router.navigate([`/camper-sign-out/${_id}`]);
  }
}
