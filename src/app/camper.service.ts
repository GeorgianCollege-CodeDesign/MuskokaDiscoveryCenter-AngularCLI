import { Injectable } from '@angular/core';
import { Camper } from "./camper";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CamperService {

  private _camper = '/api/campers';  // URL to web API
  private _activeCampers = '/api/active-campers';
  private _searchCamper = '/api/camper';
  private _camperSignin = '/api/camper-sign-in';
  private _camperSignout = '/api/camper-sign-out';
  private _dailyCampers = '/api/daily-campers';

  constructor(private http: Http) { }

  getCampers(): Observable<Camper[]> {
    return this.http.get(this._camper)
        .map(CamperService.extractData)
        .catch(CamperService.handleError);
  }

  getCamper(id: number): Observable<Camper> {
    return this.http.get(`${this._camper}/${id}`)
      .map(CamperService.extractData)
      .catch(CamperService.handleError);
  }

  createCamper(body: Object){
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.post(this._camper, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if
  }

  putCamper(body: Object, _id: string): any {
    //let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${this._camper}/${_id}`, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if
  }

  deleteCamper(_id) {
    return this.http.delete('/api/campers/' + _id).map(response => {
      response.json();
    });
  }

  getActiveCampers(){
    return this.http.get(this._activeCampers)
      .map(CamperService.extractData)
      .catch(CamperService.handleError);
  }

  searchCamper(firstName: string, lastName: string) {
    return this.http.get(`${this._searchCamper}/${firstName}/${lastName}`)
      .map(CamperService.extractData)
      .catch(CamperService.handleError);
  }

  getDailyCampers() {
    return this.http.get(this._dailyCampers)
      .map(CamperService.extractData)
      .catch(CamperService.handleError);
  }

  camperSignIn(camperParent: string) {
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this._camperSignin, {camperParent: camperParent},  options)
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if
  }

  camperSignOut(camperParent: string) {
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(this._camperSignout, {camperParent: camperParent},  options)
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if
  }

  private static extractData(res: Response) {
    let body = res.json();
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
