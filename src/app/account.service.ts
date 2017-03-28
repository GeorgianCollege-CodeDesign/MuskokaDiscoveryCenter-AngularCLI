import { Injectable } from '@angular/core';
import {Http, RequestOptions, Response, Headers} from "@angular/http";
import { Observable } from "rxjs";
import { Account } from './account';

@Injectable()
export class AccountService {

  private accountsGet = 'https://muskoka-discovery-center.herokuapp.com/api/admins';
  private loginPost = 'https://muskoka-discovery-center.herokuapp.com/api/login';
  constructor( private http: Http ) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get(this.accountsGet)
      .map(this.extractData)
      .catch(this.handleError);
  }

  login(body: Object): any {
    // body needs to contain this object template {"username": "your user name here", "password" : "your password here"}

    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${this.loginPost}`, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
