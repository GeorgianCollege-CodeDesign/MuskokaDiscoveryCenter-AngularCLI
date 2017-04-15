import { Component, OnInit } from '@angular/core';
import { AccountService } from "../account.service";

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
    private accountService: AccountService) { }

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
          this.response = data;
        });

  }

}
