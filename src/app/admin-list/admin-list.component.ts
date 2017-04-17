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

  userInfo: any;
  admins: Array<any>;

  constructor(private accountService: AccountService,
              private router: Router,
              private cookieService: CookieService) { }

  ngOnInit() {
    this.userInfo = this.cookieService.getObject('userInfo');
    console.log(this.userInfo);
    if (!this.userInfo){
      this.router.navigate(['./']);
    } else {
      if (this.userInfo.role !== 'admin'){
        this.router.navigate(['./home']);
      } else {
        this.getAdmins();
      }
    }
  }

  getAdmins(){
    this.accountService.getAccounts()
      .subscribe(data => {
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

  logout(){
    this.accountService.logOut()
      .subscribe(data => {
        if (data.status == 200){
          this.cookieService.removeAll();
          this.router.navigate(['./']);
        }
      });
  }
}
