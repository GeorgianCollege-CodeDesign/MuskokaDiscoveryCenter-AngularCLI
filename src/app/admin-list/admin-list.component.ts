import { Component, OnInit } from '@angular/core';
import { AccountService } from "../account.service";

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css'],
  providers: [ AccountService ]
})
export class AdminListComponent implements OnInit {

  admins: Array<any>;
  constructor(private accountService: AccountService) { }

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
}
