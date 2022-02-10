import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Employee} from "../Models/employee";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BearerTokenHolderService} from "./bearer-token-holder.service";
import {Qualification} from "../Models/qualification";
import {GetEmployeeQualificationDto} from "../Models/getEmployeeQualificationDto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  private employees: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);
  //employees : C'est un BehaviorSubject qui garde une liste d'employés en mémoire. Un BehaviorSubject garde toujours la dernière valeur et la partage avec les abonnés.

  public employees$: Observable<Employee[]> = this.employees.asObservable();
  //employees$ : C'est un observable qui permet à d'autres parties du code de s'abonner aux changements de la liste des employés.

  constructor(private http: HttpClient, private bearerTokenHolder: BearerTokenHolderService) {
    //this.getEmployees();
  }

  getEmployees() {
    this.http.get<Employee[]>('/backend', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).subscribe(employees => this.employees.next(employees));
  }
/*
Cette méthode effectue une requête GET pour récupérer la liste des employés depuis le serveur.
Le Authorization header contient le token Bearer nécessaire pour l'authentification.
Lors de la réponse, la liste des employés reçue est envoyée aux abonnés de employees$ via la méthode next() de BehaviorSubject.
*/

  async createEmployee(employee: Employee, qualifications: Qualification[]) {
    let e = await this.http.post<Employee>('/backend',employee,{
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise().catch((err: HttpErrorResponse) => {
      throw err;
    });

    for (const q of qualifications) {
     await this.addEmployeeQualification(e.id, q);
    }

  }
/*
Création d'un employé via une requête HTTP POST.
Ensuite, pour chaque qualification de l'employé, la méthode addEmployeeQualification est appelée pour associer les qualifications à l'employé.

*/
  async addEmployeeQualification(eId: number, qualification: Qualification) {
    await this.http.post('/addQualification/'+ eId + '/qualifications', qualification, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }
  //Ajoute une qualification à un employé via une requête HTTP POST.


  async removeEmployeeQualification(eId: number, qualification: Qualification) {
    await this.http.request('delete','/backend/' + eId + '/qualifications', {
      body: qualification,
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }
//Supprime une qualification d'un employé via une requête HTTP DELETE.

  async deleteEmployee(id: number) {
    await this.http.delete('/backend/' + id, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();
  }
//Supprime un employé en effectuant une requête HTTP DELETE à l'API.

  async getEmployeeQualifications(id: number): Promise<Qualification[]> {
    let response = await this.http.get<GetEmployeeQualificationDto>('/backend/' + id + '/qualifications', {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }).toPromise();

    return response.skillSet;
  }
//Récupère les qualifications d'un employé via une requête HTTP GET et retourne la liste des qualifications.


  getEmployee(id: number): Employee{

    for(const e of this.employees.value) {
      if(e.id === id) {
        return e;
      }
    }
    return new Employee();
  }
//Retourne un employé spécifique à partir de la liste des employés en mémoire (stockée dans BehaviorSubject).

  async updateEmployee(employee: Employee) {
    await this.http.put('/backend' + employee.id, {
      "lastName":employee.lastName,
      "firstName":employee.firstName,
      "street":employee.street,
      "postcode":employee.postcode,
      "city":employee.city,
      "phone":employee.phone
    },
    {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${this.bearerTokenHolder.bearerToken}`)
    }
      ).toPromise();
  }

}
/*
Le EmployeeService gère les opérations suivantes liées aux employés :

Récupérer la liste des employés.
Créer, mettre à jour et supprimer des employés.
Ajouter et supprimer des qualifications pour les employés.
Gérer l'état de connexion via le token Bearer pour les requêtes sécurisées.

Il utilise BehaviorSubject pour garder une trace de la liste des employés 
et expose cette liste sous forme d'observable (employees$) afin que d'autres
 parties de l'application puissent s'abonner et recevoir les mises à jour.
*/