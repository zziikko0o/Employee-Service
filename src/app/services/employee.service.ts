import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Employee} from "../Models/employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BearerTokenHolderService} from "./bearer-token-holder.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public employees$: Observable<Employee[]>

  constructor(private http: HttpClient, private bearerTokenHolder: BearerTokenHolderService) {
    //this.getEmployees();
  }

  getEmployees() {
    this.employees$ = this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    });
  }

}
