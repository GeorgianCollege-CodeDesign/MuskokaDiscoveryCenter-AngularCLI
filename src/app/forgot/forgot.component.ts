import { Component, OnInit } from '@angular/core';
import {AccountService} from "../account.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css'],
  providers: [ AccountService ]
})
export class ForgotComponent implements OnInit {

  email: string;
  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit() {
  }

  sendEmail(){
    this.accountService.sendForgotEmail(this.email)
      .subscribe(data => {
        if(data.status === 200) {
          this.router.navigate(['./log-in']);
        }
      });
  }

}
