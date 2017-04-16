import { Component, OnInit } from '@angular/core';
import { AccountService } from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
  providers: [ AccountService ]
})
export class AdminListComponent implements OnInit {

  admins: Array<any>;
  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
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
