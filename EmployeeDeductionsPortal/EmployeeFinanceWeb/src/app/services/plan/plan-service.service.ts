import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PlanServiceService {

  private baseURL = "https://employee-finance-server.herokuapp.com/endpoint/";
  
  constructor(private http: Http) { }

  getAllPlans() {
    return this.http.get(this.baseURL+"plans")
      .map( res => res.json() );
  }

}
