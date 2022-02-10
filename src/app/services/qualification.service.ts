import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BearerTokenHolderService} from "./bearer-token-holder.service";
import {Qualification} from "../Models/qualification";
import {BehaviorSubject, Observable} from "rxjs";
import {GetEmployeesByQualificationDto} from "../Models/getEmployeesByQualificationDto";
import {EmployeeService} from "./employee.service";

@Injectable({
  providedIn: 'root'
})
export class QualificationService {


  private qualifications: BehaviorSubject<Qualification[]> = new BehaviorSubject<Qualification[]>([]);
  public qualifications$: Observable<Qualification[]> = this.qualifications.asObservable();

  constructor(private http: HttpClient, private bearerTokenHolder: BearerTokenHolderService, private employeeService: EmployeeService) { }

  getQualifications() {
    this.http.get<Qualification[]>('/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).subscribe(qualifications => this.qualifications.next(qualifications.sort((a, b) => {
      if(a.designation.toLowerCase()<b.designation.toLowerCase()) {
        return -1;
      }
      return 1;
    })));
    //Les qualifications sont ensuite triées par désignation 
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

    let eQ = await this.getEmployeesByQualification(qualification);

    for(let e of eQ.employees) {
      await this.employeeService.removeEmployeeQualification(e.id, qualification);
    }

    await this.http.request('delete','/qualifications', {
      body: qualification,
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }
/*
Avant de supprimer une qualification, cette méthode obtient la liste des employés associés à cette qualification via la méthode getEmployeesByQualification.
Ensuite, elle supprime la qualification des employés via le service EmployeeService.
Enfin, la qualification est supprimée du backend via une requête HTTP DELETE.
*/
  async getEmployeesByQualification(qualification: Qualification) {
    return await this.http.get<GetEmployeesByQualificationDto>('/qualifications/' + encodeURIComponent(qualification.designation) + '/employees', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }

}

/*
Le QualificationService est responsable de la gestion des qualifications dans l'application, notamment :

Récupérer la liste des qualifications via l'API.
Créer de nouvelles qualifications après avoir vérifié leur absence.
Supprimer des qualifications, tout en supprimant d'abord la qualification des employés associés.
Récupérer les employés associés à une qualification.
Il utilise un BehaviorSubject pour maintenir un état local de la liste des qualifications et expose cette liste via un observable (qualifications$) afin que d'autres parties de l'application puissent y accéder.
*/