import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { Account } from './account';

@Injectable()
export class AccountService {

  private _accounts = '/api/admins';
  private _login = '/api/login';
  private _changePassword = '/api/change-password';
  private _logOut = '/api/logout';
  private _forgot = '/api/forgot';
  private _reset = '/api/reset';


  constructor( private http: Http ) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get(this._accounts)
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }


  getAccount(_id: string): any {
    return this.http.get(`${this._accounts}/${_id}`)
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }

  createAccount(body: Object):any {
    let bodyString  = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    //swap the body with bodyString parameter
    return this.http.post(this._accounts, bodyString, options) // ...using post request
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }

  updateAccount(body: Object, _id: string): any {

    let bodyString  = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    //swap the body with bodyString parameter
    return this.http.put(`${this._accounts}/${_id}`, bodyString, options) // ...using post request
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }

  deleteAccount(_id: string): any {
    return this.http.delete(`${this._accounts}/${_id}`)
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }

  login(body: Object): any {
    // body needs to contain this object template {"username": "your user name here", "password" : "your password here"}

    let bodyString  = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    //swap the body with bodyString parameter
    return this.http.post(this._login, bodyString, options) // ...using post request
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }

  changePassword(password: string, passwordConfirm: string){
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    //swap the body with bodyString parameter
    return this.http.post(this._changePassword, {password: password, passwordConfirm: passwordConfirm}, options) // ...using post request
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }

  logOut(){
    return this.http.get(this._logOut)
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }

  sendForgotEmail(email: string){
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    //swap the body with bodyString parameter
    return this.http.post(this._forgot, {email: email}, options) // ...using post request
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }

  resetPassword(password: string, token: string){
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    //swap the body with bodyString parameter
    return this.http.post(`${this._reset}/${token}`, {password: password}, options) // ...using post request
      .map(AccountService.extractData)
      .catch(AccountService.handleError);
  }

  // Utility functions
  private static extractData(res: Response) {
    let status = res.status;
    let body = res.json();
    body.status = status;
    return body || { };
  }

  private static handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
