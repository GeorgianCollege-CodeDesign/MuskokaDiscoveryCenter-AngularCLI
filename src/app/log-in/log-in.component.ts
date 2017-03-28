import { Component, OnInit } from '@angular/core';
import { AccountService } from "../account.service";
import {Observable} from "rxjs";
import { Router } from "@angular/router";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  username: string;
  password: string;
  role: string;
  resonpe: JSON;

  constructor(
    private accountService: AccountService,
    private router: Router,) { }

  ngOnInit() {
  }

  login(): any {
    let body = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    this.accountService.login(body)
      .subscribe(
        data => {
          this.resonpe = data;
        }, () =>{
          this.router.navigateByUrl('');
        });

  };

}
