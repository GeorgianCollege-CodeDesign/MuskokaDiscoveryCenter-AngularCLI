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
  private _camperSignIn = '/api/camper-sign-in';
  private _camperSignOut = '/api/camper-sign-out';
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
      .map(CamperService.extractData)
      .catch(CamperService.handleError);
  }

  putCamper(body: Object, _id: string): any {
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${this._camper}/${_id}`, body, options) // ...using put request
      .map(CamperService.extractData)
      .catch(CamperService.handleError);
  }

  deleteCamper(_id) {
    return this.http.delete(`${this._camper}/${_id}`).map(response => {
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

  camperSignIn(camperParent: string, _id: string) {
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${this._camperSignIn}/${_id}`, {camperParent: camperParent},  options)
      .map(CamperService.extractData)
      .catch(CamperService.handleError);
  }

  camperSignOut(camperParent: string, _id: string) {
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.post(`${this._camperSignIn}/${_id}`, {camperParent: camperParent},  options)
      .map(CamperService.extractData)
      .catch(CamperService.handleError);
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
