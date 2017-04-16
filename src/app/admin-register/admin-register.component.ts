import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
  providers: [ AccountService ]
})
export class AdminRegisterComponent implements OnInit {

  username: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  role: string;
  email: string;

  admin: string = "admin";
  staff: string = "staff";

  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
  }

  createAccount(){
    if (this.password === this.passwordConfirm){
      let newAccount = {
        username: this.username,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        role: this.role,
        email: this.email
      };

      this.accountService.createAccount(newAccount)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['./admin-list']);
        });
    } else {
      alert('Please match your password.');
    }
  }
}
