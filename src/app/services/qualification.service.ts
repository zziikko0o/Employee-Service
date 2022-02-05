import { Injectable } from '@angular/core';
import {Employee} from "../Models/employee";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BearerTokenHolderService} from "./bearer-token-holder.service";
import {Qualification} from "../Models/qualification";
import {BehaviorSubject, catchError, Observable} from "rxjs";
import {error} from "jquery";
import {GetEmployeesByQualificationDto} from "../Models/getEmployeesByQualificationDto";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {


  private qualifications: BehaviorSubject<Qualification[]> = new BehaviorSubject<Qualification[]>([]);
  public qualifications$: Observable<Qualification[]> = this.qualifications.asObservable();

  constructor(private http: HttpClient, private bearerTokenHolder: BearerTokenHolderService) { }

  getQualifications() {
    this.http.get<Qualification[]>('/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).subscribe(qualifications => this.qualifications.next(qualifications));
  }

  async create(qualification: Qualification) {

    let doesExist = false;

    this.qualifications.value.forEach(q => {
      if(q.designation === qualification.designation) doesExist = true;
    })

    if(doesExist) {
      return;
    }
    else {
      await this.http.post<Qualification>('/qualifications',
        qualification,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
        }).toPromise();
    }
  }

  async deleteQualification(qualification: Qualification) {
    await this.http.request('delete','/qualifications', {
      body: qualification,
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }

  async getEmployeesByQualification(qualification: Qualification) {
    return await this.http.get<GetEmployeesByQualificationDto>('/qualifications/' + encodeURIComponent(qualification.designation) + '/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }

}
