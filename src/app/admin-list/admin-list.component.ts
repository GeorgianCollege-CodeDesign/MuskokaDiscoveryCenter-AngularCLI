import { Component, OnInit } from '@angular/core';
import { AccountService } from "../account.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
  providers: [ AccountService, CookieService ]
})
export class AdminListComponent implements OnInit {

  userInfo: Object;
  admins: Array<any>;

  constructor(private accountService: AccountService,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
    this.getAdmins();
  }

  getAdmins(){
    this.accountService.getAccounts()
      .subscribe(data => {
        console.log(data);
        this.admins = data;
      });
  }


  deleteAdmin(_id) {
    if (confirm('Are you sure you want to delete this camper?')) {
      this.accountService.deleteAccount(_id).
      subscribe(response => {
        this.getAdmins();
        this.router.navigate(['./admin-list']);
      });
    }
  }
}
