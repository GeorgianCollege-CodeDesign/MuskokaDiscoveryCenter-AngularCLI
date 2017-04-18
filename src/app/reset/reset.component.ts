import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css'],
  providers: [ AccountService ]
})
export class ResetComponent implements OnInit {

  password: string;
  passwordConfirm: string;
  token: string;
  constructor(private accountService: AccountService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      let token = params['token'];
      console.log(token);
      this.token = token;
    });
  }

  resetPassword(){
    this.accountService.resetPassword(this.password, this.token)
      .subscribe(data => {
        if(data.status === 200) {
          this.router.navigate(['./log-in']);
        }
      });
  }

}
