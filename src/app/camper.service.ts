import { Injectable } from '@angular/core';
import { Camper } from "./camper";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class CamperService {

  private camper = '/api/campers';  // URL to web API


  constructor(private http: Http) { }

  getCampers(): Observable<Camper[]> {
    return this.http.get(this.camper)
        .map(this.extractData)
        .catch(this.handleError);
  }

  getCamper(id: number): Observable<Camper> {
    return this.http.get(`${this.camper}/${id}`)
      .map(this.extractData)
      .catch(this.handleError);
  }

  putCamper(body: Object, _id: string): any {
    let bodyString = JSON.stringify(body); // Stringify payload
    let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    let options       = new RequestOptions({ headers: headers }); // Create a request option

    return this.http.put(`${this.camper}/${_id}`, body, options) // ...using put request
      .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); //...errors if
  }

  deleteCamper(_id) {
    return this.http.delete('/api/campers/' + _id).map(response => {
      response.json();
    });
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
    //console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
