import { Component, OnInit } from '@angular/core';
import { CamperService } from "../camper.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-camper-active',
  templateUrl: './camper-active.component.html',
  styleUrls: ['./camper-active.component.css'],
  providers: [ CamperService ]
})
export class CamperActiveComponent implements OnInit {

  campers: Array<any>;
  errorMessage: any;

  constructor(private camperService: CamperService,
              private router: Router) { }

  ngOnInit() {
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
