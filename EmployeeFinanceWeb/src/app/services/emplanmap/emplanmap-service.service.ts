import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class EmplanmapServiceService {

  private baseURL = "https://employee-finance-server.herokuapp.com/endpoint/";
  
  constructor(private http: Http) { }

  getEmployeesPlans(eid) {
    return this.http.get(this.baseURL+"emplan/"+eid)
      .map( res => res.json() );
  }

  addEmplPlanMap(eid, plans) {
    var payload = {"eid": eid,
                  "plans": plans};

    return this.http.post(this.baseURL+"emplan", payload)
      .map( res => res.json() );
  }

  editEmplPlanMap(eid, plans) {
    var payload = {"plans": plans};
    console.log(payload);
    return this.http.put(this.baseURL+"emplan/"+eid, payload)
      .map( res => res.json() );
  }
}
