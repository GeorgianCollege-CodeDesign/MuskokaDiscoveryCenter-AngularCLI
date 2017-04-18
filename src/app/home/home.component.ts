import {Component, Inject, OnInit} from '@angular/core';
import {CamperService} from "../camper.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/core";
import {AccountService} from "../account.service";
import {PageScrollInstance, PageScrollService} from "ng2-page-scroll";
import {DOCUMENT} from "@angular/platform-browser";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ CamperService, CookieService, AccountService, PageScrollService ]
})
export class HomeComponent implements OnInit {

  camperSignInList: Array<any>;
  camperSignOutList: Array<any>;
  userInfo: Object;

  constructor(private camperService: CamperService,
              private router: Router,
              private cookieService: CookieService,
              private accountService: AccountService,
              private pageScrollService: PageScrollService,
              @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.camperSignInList = null;
    this.camperSignOutList = null;
    this.userInfo = this.cookieService.getObject('userInfo');
    console.log(this.userInfo);
    if (!this.userInfo){
      this.router.navigate(['./']);
    }
  }

  getSignInList(){
    this.camperService.getActiveCampers()
      .subscribe(data => {
        if (data.status === 200){
          this.camperSignInList = data;
          console.log(this.camperSignInList);
          this.camperSignOutList = null;
          setTimeout(()=>{
            this.goToSignIn();
          },200);
        } else {
          this.camperSignInList = null;
          this.camperSignOutList = null;
        }
      });
  }

  public goToSignIn(): void {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#signin');
    this.pageScrollService.start(pageScrollInstance);
  };

  public goToSignOut(): void {
    let pageScrollInstance: PageScrollInstance = PageScrollInstance.simpleInstance(this.document, '#signout');
    this.pageScrollService.start(pageScrollInstance);
  };

  camperSignIn(_id: string){
    this.router.navigate([`/camper-sign-in/${_id}`]);
  }

  getSignOutList(){
    this.camperService.getDailyCampers()
      .subscribe(data => {
        if (data.status === 200){
          this.camperSignOutList = data.camper;
          this.camperSignInList = null;
          setTimeout(()=>{
            this.goToSignOut();
          },200);
        } else {
          this.camperSignInList = null;
          this.camperSignOutList = null;
        }
      });
  }

  camperSignOut(_id: string) {
    this.router.navigate([`/camper-sign-out/${_id}`]);
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
