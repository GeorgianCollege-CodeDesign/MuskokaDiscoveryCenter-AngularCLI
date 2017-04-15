import { Component, OnInit } from '@angular/core';
import { AccountService } from "../account.service";
import {CamperService} from "../camper.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
  providers: [AccountService]
})

export class LogInComponent implements OnInit {

  username: string;
  password: string;
  response: string;

  constructor(
    private accountService: AccountService,
    private camperService: CamperService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    let body = {
      username: this.username,
      password: this.password
    };
    this.accountService.login(body)
      .subscribe(
        data => {
         if(data.status == 200){
           this.router.navigate(['./']);
         }
        });

  }

}
