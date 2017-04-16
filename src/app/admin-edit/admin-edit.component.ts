import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css'],
  providers: [ AccountService ]
})
export class AdminEditComponent implements OnInit {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;

  admin: string = "admin";
  staff: string = "staff";

  constructor(private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      let adminID = params['id'];
      console.log(adminID);
      this._id = adminID;
      this.accountService.getAccount(this._id)
        .subscribe(data => {
          this.username = data.username;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.role = data.role;
          this.email = data.email;
        });
    });
  }

  updateAdmin(){
    let admin = {
      _id: this._id,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      email: this.email
    };

    this.accountService.updateAccount(admin, this._id)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['./admin-list']);
      })
  }

}
