import { Injectable } from '@angular/core';
import {Employee} from "../Models/employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BearerTokenHolderService} from "./bearer-token-holder.service";
import {Qualification} from "../Models/qualification";
import {catchError, Observable} from "rxjs";
import {error} from "jquery";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  qualifications$: Observable<Qualification[]>;

  constructor(private http: HttpClient, private bearerTokenHolder: BearerTokenHolderService) { }

  getQualifications() {
    this.qualifications$ = this.http.get<Qualification[]>('/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    });
  }

  create(qualification: Qualification) {
    let temp =  this.http.post<Qualification>('/qualifications',
      qualification,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
      });

    //console.log(temp.toPromise().then())
  }
}
