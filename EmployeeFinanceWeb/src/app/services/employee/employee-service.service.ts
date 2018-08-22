import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Employee } from '../../models/employee';

@Injectable()
export class EmployeeServiceService {

  private baseURL = "https://employee-finance-server.herokuapp.com/endpoint/";

  constructor(private http: Http) { }

  getAllEmployees() {
    return this.http.get(this.baseURL+"employees")
      .map( res => res.json() );
  }

  deleteEmployee(eid) {
    return this.http.delete(this.baseURL+"employee/"+eid)
      .map( res => res.json() );
  }

  getEmployee(eid) {
    return this.http.get(this.baseURL+"employee/"+eid)
      .map( res => res.json() );
  }

  createEmployee(e) {
    return this.http.post(this.baseURL+"employee/",e)
      .map( res => res.json() );
  }

  editEmployee(e) {
    return this.http.put(this.baseURL+"employee/"+e.id,e)
      .map( res => res.json() );
  }
  
}
