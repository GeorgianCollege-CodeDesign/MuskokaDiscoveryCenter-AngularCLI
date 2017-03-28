import { Component } from '@angular/core';
import { CamperService } from "./camper.service";
import {Camper} from "./camper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CamperService]
})

export class AppComponent {
  title = 'app works!';
  campers: Camper[];
  errorMessage: any;
  constructor(private camperService: CamperService) {
    //this.getCampers();
  }

  getCampers() {
    this.camperService.getCampers()
      .subscribe(
        campers => this.campers = campers,
        error =>  this.errorMessage = <any>error);
    console.log(this.campers);
  }
}
